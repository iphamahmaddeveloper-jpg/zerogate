import os
import json
import sys

# Agar modul 'app' bisa diimport
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine, SessionLocal
from app.models.schema import Base, User, JobPosting, CandidateProfile, JobApplication
from app.ai_matcher import generate_embedding
from app.api.auth import get_password_hash

def seed_data():
    print("Membuat tabel database...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if data already exists
    if db.query(User).first():
        print("Data sudah ada, membatalkan seeding.")
        db.close()
        return

    print("Membuat Akun Perusahaan (Company)...")
    company_password = get_password_hash("password123")
    company_user = User(email="company@zerogate.com", hashed_password=company_password, role="company")
    db.add(company_user)
    db.commit()
    db.refresh(company_user)

    print("Membuat Data Lowongan...")
    job = JobPosting(
        company_id=company_user.id,
        title="Senior Frontend Developer",
        description="Kami mencari Frontend Developer berpengalaman untuk membangun aplikasi web modern menggunakan React.",
        requirements="React, TypeScript, Tailwind CSS, REST API"
    )
    
    # Generate vector
    job_text = f"Title: {job.title}. Deskripsi: {job.description}. Kualifikasi: {job.requirements}"
    print(f"Men-generate vektor untuk lowongan... (ini bisa butuh waktu jika model belum di-download)")
    job.embedding_json = json.dumps(generate_embedding(job_text))
    
    db.add(job)
    db.commit()
    db.refresh(job)
    
    print("Membuat Data Dummy Pelamar...")
    dummy_candidates = [
        {
            "email": "budi@zerogate.com",
            "name": "Budi Santoso",
            "skills": "React, TypeScript, Tailwind CSS, Node.js",
            "experience": "5 tahun pengalaman membangun dashboard React yang kompleks."
        },
        {
            "email": "siti@zerogate.com",
            "name": "Siti Aminah",
            "skills": "Vue.js, JavaScript, CSS, Bootstrap",
            "experience": "3 tahun pengalaman membuat UI menggunakan Vue."
        },
        {
            "email": "andi@zerogate.com",
            "name": "Andi Saputra",
            "skills": "React, CSS, REST API",
            "experience": "Junior developer dengan 1 tahun pengalaman React."
        }
    ]

    candidate_password = get_password_hash("password123")

    for cand in dummy_candidates:
        print(f"Memproses {cand['name']}...")
        
        # Create User
        cand_user = User(email=cand["email"], hashed_password=candidate_password, role="candidate")
        db.add(cand_user)
        db.commit()
        db.refresh(cand_user)

        # Create Profile
        profile_text = f"Skills: {cand['skills']}. Pengalaman: {cand['experience']}"
        vector = generate_embedding(profile_text)
        
        db_cand = CandidateProfile(
            user_id=cand_user.id,
            full_name=cand["name"],
            skills=cand["skills"],
            experience=cand["experience"],
            embedding_json=json.dumps(vector)
        )
        db.add(db_cand)

    db.commit()

    print("Membuat Data Dummy Job Application...")
    budi_profile = db.query(CandidateProfile).filter(CandidateProfile.full_name == "Budi Santoso").first()
    andi_profile = db.query(CandidateProfile).filter(CandidateProfile.full_name == "Andi Saputra").first()
    
    if budi_profile:
        app1 = JobApplication(job_id=job.id, candidate_id=budi_profile.id, status="pending")
        db.add(app1)
    if andi_profile:
        app2 = JobApplication(job_id=job.id, candidate_id=andi_profile.id, status="pending")
        db.add(app2)
        
    db.commit()

    print("Data dummy berhasil disuntikkan!")
    db.close()

if __name__ == "__main__":
    seed_data()
