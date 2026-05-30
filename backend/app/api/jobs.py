import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional

from ..database import get_db
from ..models.schema import JobPosting, CandidateProfile, User, JobApplication
from .auth import get_current_user
from ..ai_matcher import generate_embedding, calculate_similarity_from_embeddings, analyze_skill_gap

router = APIRouter(prefix="/api", tags=["jobs"])

# --- Pydantic Models ---
class JobCreate(BaseModel):
    title: str
    department: Optional[str] = None
    experience_level: Optional[str] = None
    contract_type: Optional[str] = None
    work_scheme: Optional[str] = None
    location: Optional[str] = None
    salary_range: Optional[str] = None
    description: str
    hard_skills: List[str]
    soft_skills: List[str]

class JobUpdate(JobCreate):
    pass

class ProfileUpdate(BaseModel):
    photo_url: Optional[str] = None
    full_name: str
    title: Optional[str] = None
    summary: Optional[str] = None
    contact_email: Optional[str] = None
    contact_whatsapp: Optional[str] = None
    location: Optional[str] = None
    contract_preference: Optional[str] = None
    work_scheme_preference: Optional[str] = None
    education: Optional[str] = None
    experience: Optional[str] = None
    hard_skills: List[str] = []
    soft_skills: List[str] = []

class StatusUpdate(BaseModel):
    status: str

# --- Endpoints for Candidates ---

@router.get("/profile")
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'candidate':
        raise HTTPException(status_code=403, detail="Not authorized")
    
    profile = db.query(CandidateProfile).filter(CandidateProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
        
    return {
        "photo_url": profile.photo_url,
        "full_name": profile.full_name,
        "title": profile.title,
        "summary": profile.summary,
        "contact_email": profile.contact_email,
        "contact_whatsapp": profile.contact_whatsapp,
        "location": profile.location,
        "contract_preference": profile.contract_preference,
        "work_scheme_preference": profile.work_scheme_preference,
        "education": profile.education,
        "experience": profile.experience,
        "hard_skills": json.loads(profile.hard_skills) if profile.hard_skills else [],
        "soft_skills": json.loads(profile.soft_skills) if profile.soft_skills else [],
    }

@router.put("/profile")
def update_profile(profile_data: ProfileUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'candidate':
        raise HTTPException(status_code=403, detail="Not authorized")
        
    profile = db.query(CandidateProfile).filter(CandidateProfile.user_id == current_user.id).first()
    if not profile:
        profile = CandidateProfile(user_id=current_user.id)
        db.add(profile)
        
    profile.photo_url = profile_data.photo_url
    profile.full_name = profile_data.full_name
    profile.title = profile_data.title
    profile.summary = profile_data.summary
    profile.contact_email = profile_data.contact_email
    profile.contact_whatsapp = profile_data.contact_whatsapp
    profile.location = profile_data.location
    profile.contract_preference = profile_data.contract_preference
    profile.work_scheme_preference = profile_data.work_scheme_preference
    profile.education = profile_data.education
    profile.experience = profile_data.experience
    
    profile.hard_skills = json.dumps(profile_data.hard_skills)
    profile.soft_skills = json.dumps(profile_data.soft_skills)
    
    # Generate Semantic Text for Vector Embedding
    h_skills_str = ", ".join(profile_data.hard_skills)
    s_skills_str = ", ".join(profile_data.soft_skills)
    
    profile_text = f"Title: {profile.title}. Summary: {profile.summary}. Hard Skills: {h_skills_str}. Soft Skills: {s_skills_str}. Pengalaman: {profile.experience}"
    
    try:
        vector = generate_embedding(profile_text)
        profile.embedding_json = json.dumps(vector)
    except Exception as e:
        print(f"Warning: Could not generate embedding. {e}")
    
    db.commit()
    return {"message": "Profile updated successfully"}

@router.get("/jobs/recommendations")
def get_job_recommendations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'candidate':
        raise HTTPException(status_code=403, detail="Not authorized")
        
    profile = db.query(CandidateProfile).filter(CandidateProfile.user_id == current_user.id).first()
    if not profile or not profile.embedding_json:
        return [] 
        
    cand_embedding = json.loads(profile.embedding_json)
    all_jobs = db.query(JobPosting).all()
    
    applied_job_ids = [app.job_id for app in profile.applications]
    
    recommendations = []
    for job in all_jobs:
        if not job.embedding_json:
            continue
        job_embedding = json.loads(job.embedding_json)
        score = calculate_similarity_from_embeddings(job_embedding, cand_embedding)
        
        # Determine requirements string for legacy analyze_skill_gap
        req_str = job.requirements or ", ".join(json.loads(job.hard_skills) if job.hard_skills else [])
        cand_skills_str = profile.skills or ", ".join(json.loads(profile.hard_skills) if profile.hard_skills else [])
        
        gap_info = analyze_skill_gap(req_str, cand_skills_str)
        
        recommendations.append({
            "id": job.id,
            "title": job.title,
            "company_id": job.company_id,
            "score": score,
            "gap": ", ".join(gap_info["missing_skills"]) if gap_info["missing_skills"] else "Tidak ada",
            "has_applied": job.id in applied_job_ids,
            "work_scheme": job.work_scheme,
            "location": job.location,
            "salary_range": job.salary_range
        })
        
    recommendations.sort(key=lambda x: x["score"], reverse=True)
    return recommendations

@router.post("/jobs/{job_id}/apply")
def apply_to_job(job_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'candidate':
        raise HTTPException(status_code=403, detail="Not authorized")
    
    profile = db.query(CandidateProfile).filter(CandidateProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=400, detail="Lengkapi profil terlebih dahulu")

    existing = db.query(JobApplication).filter(
        JobApplication.job_id == job_id, 
        JobApplication.candidate_id == profile.id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Sudah melamar ke pekerjaan ini")

    new_app = JobApplication(job_id=job_id, candidate_id=profile.id, status="pending")
    db.add(new_app)
    db.commit()
    return {"message": "Berhasil melamar pekerjaan"}

@router.get("/applications")
def get_my_applications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'candidate':
        raise HTTPException(status_code=403, detail="Not authorized")
        
    profile = db.query(CandidateProfile).filter(CandidateProfile.user_id == current_user.id).first()
    if not profile:
        return []
        
    apps = db.query(JobApplication).filter(JobApplication.candidate_id == profile.id).all()
    results = []
    for app in apps:
        results.append({
            "id": app.id,
            "job_id": app.job.id,
            "job_title": app.job.title,
            "company_id": app.job.company_id,
            "status": app.status,
            "applied_at": app.applied_at
        })
    return results


# --- Endpoints for Companies ---

@router.post("/jobs/create")
def create_job(job_data: JobCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'company':
        raise HTTPException(status_code=403, detail="Only companies can create jobs")
        
    new_job = JobPosting(
        company_id=current_user.id,
        title=job_data.title,
        department=job_data.department,
        experience_level=job_data.experience_level,
        contract_type=job_data.contract_type,
        work_scheme=job_data.work_scheme,
        location=job_data.location,
        salary_range=job_data.salary_range,
        description=job_data.description,
        hard_skills=json.dumps(job_data.hard_skills),
        soft_skills=json.dumps(job_data.soft_skills)
    )
    
    h_skills_str = ", ".join(job_data.hard_skills)
    s_skills_str = ", ".join(job_data.soft_skills)
    
    job_text = f"Title: {new_job.title}. Deskripsi: {new_job.description}. Hard Skills: {h_skills_str}. Soft Skills: {s_skills_str}"
    try:
        new_job.embedding_json = json.dumps(generate_embedding(job_text))
    except Exception as e:
        print(f"Warning: Could not generate embedding. {e}")
    
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return {"message": "Job created successfully", "job_id": new_job.id}

@router.put("/jobs/{job_id}")
def update_job(job_id: int, job_data: JobUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'company':
        raise HTTPException(status_code=403, detail="Only companies can update jobs")
        
    job = db.query(JobPosting).filter(JobPosting.id == job_id, JobPosting.company_id == current_user.id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found or access denied")
        
    job.title = job_data.title
    job.department = job_data.department
    job.experience_level = job_data.experience_level
    job.contract_type = job_data.contract_type
    job.work_scheme = job_data.work_scheme
    job.location = job_data.location
    job.salary_range = job_data.salary_range
    job.description = job_data.description
    job.hard_skills = json.dumps(job_data.hard_skills)
    job.soft_skills = json.dumps(job_data.soft_skills)
    
    h_skills_str = ", ".join(job_data.hard_skills)
    s_skills_str = ", ".join(job_data.soft_skills)
    job_text = f"Title: {job.title}. Deskripsi: {job.description}. Hard Skills: {h_skills_str}. Soft Skills: {s_skills_str}"
    try:
        job.embedding_json = json.dumps(generate_embedding(job_text))
    except Exception as e:
        pass
    
    db.commit()
    return {"message": "Job updated successfully"}

@router.get("/company/jobs")
def get_company_jobs(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'company':
        raise HTTPException(status_code=403, detail="Not authorized")
    jobs = db.query(JobPosting).filter(JobPosting.company_id == current_user.id).all()
    
    result = []
    for job in jobs:
        app_count = db.query(JobApplication).filter(JobApplication.job_id == job.id).count()
        result.append({
            "id": job.id,
            "title": job.title,
            "department": job.department,
            "experience_level": job.experience_level,
            "contract_type": job.contract_type,
            "work_scheme": job.work_scheme,
            "location": job.location,
            "salary_range": job.salary_range,
            "description": job.description,
            "hard_skills": json.loads(job.hard_skills) if job.hard_skills else [],
            "soft_skills": json.loads(job.soft_skills) if job.soft_skills else [],
            "applicant_count": app_count
        })
    return result

@router.get("/jobs/{job_id}/candidates")
def get_ranked_candidates(job_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'company':
        raise HTTPException(status_code=403, detail="Only companies can view candidates")
        
    job = db.query(JobPosting).filter(JobPosting.id == job_id, JobPosting.company_id == current_user.id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found or access denied")
        
    applications = db.query(JobApplication).filter(JobApplication.job_id == job_id).all()
    if not job.embedding_json:
        return []
        
    job_embedding = json.loads(job.embedding_json)
    
    ranked_list = []
    for app in applications:
        cand = app.candidate
        if not cand.embedding_json:
            continue
            
        cand_embedding = json.loads(cand.embedding_json)
        score = calculate_similarity_from_embeddings(job_embedding, cand_embedding)
        
        req_str = job.requirements or ", ".join(json.loads(job.hard_skills) if job.hard_skills else [])
        cand_skills_str = cand.skills or ", ".join(json.loads(cand.hard_skills) if cand.hard_skills else [])
        
        gap_info = analyze_skill_gap(req_str, cand_skills_str)
        
        ranked_list.append({
            "id": cand.id,
            "application_id": app.id,
            "name": cand.full_name,
            "skills": cand_skills_str, 
            "score": score,
            "gap": ", ".join(gap_info["missing_skills"]) if gap_info["missing_skills"] else "Tidak ada",
            "status": app.status
        })
        
    ranked_list.sort(key=lambda x: x["score"], reverse=True)
    return ranked_list

@router.put("/applications/{app_id}/status")
def update_application_status(app_id: int, status_update: StatusUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'company':
        raise HTTPException(status_code=403, detail="Not authorized")
        
    app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
        
    if app.job.company_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    if status_update.status not in ["pending", "accepted", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status")
        
    app.status = status_update.status
    db.commit()
    return {"message": "Status updated successfully", "status": app.status}

@router.delete("/jobs/{job_id}")
def delete_job(job_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'company':
        raise HTTPException(status_code=403, detail="Not authorized")
        
    job = db.query(JobPosting).filter(JobPosting.id == job_id, JobPosting.company_id == current_user.id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found or access denied")
        
    db.query(JobApplication).filter(JobApplication.job_id == job_id).delete()
    db.delete(job)
    db.commit()
    return {"message": "Job deleted successfully"}
