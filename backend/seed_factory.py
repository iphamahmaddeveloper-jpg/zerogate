import os
import sys
import json
import random
import time

# Memastikan modul 'app' bisa diimport
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine, SessionLocal, Base
from app.models.schema import User, JobPosting, CandidateProfile, JobApplication
from app.ai_matcher import generate_embedding
from app.api.auth import get_password_hash

# --- DATA POOLS UNTUK GENERASI ACAK ---

FIRST_NAMES = ["Budi", "Siti", "Andi", "Rina", "Agus", "Dewi", "Eko", "Fitri", "Gilang", "Hani", "Irfan", "Joko", "Kartika", "Lestari", "Muhammad", "Nadia", "Oka", "Putri", "Rizky", "Sari", "Teguh", "Utami", "Vina", "Wahyu", "Yogi", "Zahra", "Ahmad", "Dian", "Fajar", "Hendra"]
LAST_NAMES = ["Santoso", "Aminah", "Saputra", "Wijaya", "Pratama", "Kusuma", "Setiawan", "Hidayat", "Wibowo", "Putra", "Lestari", "Gunawan", "Sari", "Kurniawan", "Nugroho", "Siregar", "Sanjaya", "Halim", "Purnama", "Yulianti", "Ramadhan", "Maulana", "Suryani", "Anggraini"]

HARD_SKILLS_POOL = ["React", "Python", "Node.js", "SQL", "Docker", "AWS", "Figma", "UI/UX", "Java", "Kotlin", "Swift", "Flutter", "Machine Learning", "Data Analysis", "SEO", "Google Ads", "Kubernetes", "Linux", "C++", "Go", "TypeScript", "Tailwind CSS"]
SOFT_SKILLS_POOL = ["Teamwork", "Communication", "Problem Solving", "Leadership", "Adaptability", "Time Management", "Critical Thinking", "Creativity", "Work Ethic", "Attention to Detail"]

JOB_TEMPLATES = [
    {
        "title": "Senior Frontend Developer", "department": "Engineering", "exp": "Senior Level",
        "desc": "Membangun antarmuka web modern dengan skalabilitas tinggi.",
        "h_skills": ["React", "TypeScript", "Tailwind CSS"], "s_skills": ["Problem Solving", "Teamwork"]
    },
    {
        "title": "Backend Engineer", "department": "Engineering", "exp": "Mid Level",
        "desc": "Merancang dan memelihara REST API yang efisien dan aman.",
        "h_skills": ["Python", "Node.js", "SQL"], "s_skills": ["Analytical Thinking", "Adaptability"]
    },
    {
        "title": "UI/UX Designer", "department": "Design", "exp": "Mid Level",
        "desc": "Merancang pengalaman pengguna yang intuitif dan menarik.",
        "h_skills": ["Figma", "UI/UX", "Adobe XD"], "s_skills": ["Creativity", "Empathy", "Communication"]
    },
    {
        "title": "Data Analyst", "department": "Data", "exp": "Entry Level",
        "desc": "Menganalisis data besar untuk memberikan wawasan bisnis.",
        "h_skills": ["SQL", "Python", "Data Analysis"], "s_skills": ["Critical Thinking", "Attention to Detail"]
    },
    {
        "title": "Mobile Developer", "department": "Engineering", "exp": "Mid Level",
        "desc": "Membangun aplikasi mobile cross-platform berkualitas tinggi.",
        "h_skills": ["Flutter", "Kotlin", "Swift"], "s_skills": ["Problem Solving", "Work Ethic"]
    },
    {
        "title": "QA Engineer", "department": "Engineering", "exp": "Entry Level",
        "desc": "Memastikan kualitas perangkat lunak dengan pengujian otomatis.",
        "h_skills": ["Selenium", "Python", "Testing"], "s_skills": ["Attention to Detail", "Communication"]
    },
    {
        "title": "DevOps Engineer", "department": "Engineering", "exp": "Senior Level",
        "desc": "Mengelola infrastruktur cloud dan pipeline CI/CD.",
        "h_skills": ["Docker", "Kubernetes", "AWS", "Linux"], "s_skills": ["Problem Solving", "Time Management"]
    },
    {
        "title": "HR Specialist", "department": "Human Resources", "exp": "Mid Level",
        "desc": "Mengelola rekrutmen dan kesejahteraan karyawan.",
        "h_skills": ["Recruitment", "HRIS", "Interviewing"], "s_skills": ["Communication", "Empathy", "Leadership"]
    },
    {
        "title": "Digital Marketer", "department": "Marketing", "exp": "Mid Level",
        "desc": "Merencanakan dan mengeksekusi kampanye pemasaran digital.",
        "h_skills": ["SEO", "Google Ads", "Content Marketing"], "s_skills": ["Creativity", "Analytical Thinking"]
    },
    {
        "title": "IT Support Specialist", "department": "IT", "exp": "Entry Level",
        "desc": "Memberikan dukungan teknis kepada internal perusahaan.",
        "h_skills": ["Troubleshooting", "Networking", "Windows/Linux"], "s_skills": ["Communication", "Patience", "Problem Solving"]
    }
]

def generate_random_name():
    return f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"

def seed_database():
    start_time = time.time()
    print("Memulai Data Factory Generator untuk Zero Gate...")
    
    # 1. Setup Database
    print("\nMempersiapkan Database (Drop & Create)...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    default_password = get_password_hash("password123")

    # 2. Membuat Perusahaan & Lowongan
    print("\nMembuat 10 Akun Perusahaan dan 20 Lowongan...")
    jobs_created = []
    
    for i in range(1, 11):
        email = f"company{i}@gmail.com"
        comp_user = User(email=email, hashed_password=default_password, role="company")
        db.add(comp_user)
        db.commit()
        db.refresh(comp_user)
        
        # Tiap company posting 2 lowongan secara acak
        templates = random.sample(JOB_TEMPLATES, 2)
        for t in templates:
            job = JobPosting(
                company_id=comp_user.id,
                title=t["title"],
                department=t["department"],
                experience_level=t["exp"],
                contract_type=random.choice(["Full-time", "Contract"]),
                work_scheme=random.choice(["Remote", "On-site", "Hybrid"]),
                location=random.choice(["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Bali"]),
                salary_range=random.choice(["Rp 8jt - 15jt", "Rp 15jt - 25jt", "Negotiable"]),
                description=t["desc"],
                hard_skills=json.dumps(t["h_skills"]),
                soft_skills=json.dumps(t["s_skills"])
            )
            
            # Generate Vektor AI
            h_str = ", ".join(t["h_skills"])
            s_str = ", ".join(t["s_skills"])
            job_text = f"Title: {job.title}. Deskripsi: {job.description}. Hard Skills: {h_str}. Soft Skills: {s_str}"
            try:
                job.embedding_json = json.dumps(generate_embedding(job_text))
            except Exception as e:
                print(f"Warning AI: {e}")
                job.embedding_json = "[]"
                
            db.add(job)
            db.commit()
            db.refresh(job)
            jobs_created.append(job.id)
            print(f"  Lowongan dibuat: {job.title} (oleh Company {i})")

    # 3. Membuat Pelamar Massal
    print(f"\nMembuat 100 Akun Pelamar dan Profil (Generating AI Vectors)...")
    candidates_created = []
    
    for i in range(1, 101):
        email = f"pelamar{i}@gmail.com"
        cand_user = User(email=email, hashed_password=default_password, role="candidate")
        db.add(cand_user)
        db.commit()
        db.refresh(cand_user)
        
        full_name = generate_random_name()
        h_skills = random.sample(HARD_SKILLS_POOL, random.randint(2, 5))
        s_skills = random.sample(SOFT_SKILLS_POOL, random.randint(2, 4))
        
        profile = CandidateProfile(
            user_id=cand_user.id,
            full_name=full_name,
            title=random.choice(["Software Engineer", "Creative Designer", "Data Enthusiast", "IT Professional", "Tech Lead"]),
            summary=f"Profesional yang berdedikasi dengan keahlian mendalam di bidang {h_skills[0]} dan pengalaman bekerja dalam tim.",
            location=random.choice(["Jakarta Raya", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Banten"]),
            contract_preference=random.choice(["Full-time", "Contract"]),
            work_scheme_preference=random.choice(["Remote", "Hybrid", "On-site"]),
            experience=f"Memiliki pengalaman menangani berbagai proyek yang berkaitan dengan {h_skills[0]} dan {s_skills[0]}.",
            hard_skills=json.dumps(h_skills),
            soft_skills=json.dumps(s_skills)
        )
        
        # Generate Vektor AI
        h_str = ", ".join(h_skills)
        s_str = ", ".join(s_skills)
        profile_text = f"Title: {profile.title}. Summary: {profile.summary}. Hard Skills: {h_str}. Soft Skills: {s_str}. Pengalaman: {profile.experience}"
        
        try:
            profile.embedding_json = json.dumps(generate_embedding(profile_text))
        except:
            profile.embedding_json = "[]"
            
        db.add(profile)
        db.commit()
        db.refresh(profile)
        candidates_created.append(profile.id)
        
        # Tampilkan progress setiap 10 pelamar
        if i % 10 == 0:
            print(f"  Progress: {i}/100 pelamar ter-generate...")

    # 4. Simulasi Lamaran Massal
    print("\nMensimulasikan Ratusan Lamaran Pekerjaan secara Acak...")
    application_count = 0
    for cand_id in candidates_created:
        # Tiap kandidat melamar 3-5 pekerjaan
        jobs_to_apply = random.sample(jobs_created, random.randint(3, 5))
        for j_id in jobs_to_apply:
            app = JobApplication(
                job_id=j_id,
                candidate_id=cand_id,
                status=random.choices(["pending", "accepted", "rejected"], weights=[70, 15, 15], k=1)[0]
            )
            db.add(app)
            application_count += 1
            
    db.commit()
    print(f"  Berhasil menyuntikkan {application_count} lamaran pekerjaan!")
    
    db.close()
    
    end_time = time.time()
    duration = round(end_time - start_time, 2)
    print(f"\nDONE! Data Factory berhasil diselesaikan dalam {duration} detik.")
    print("="*50)
    print("Gunakan kredensial berikut untuk login:")
    print("Company : company1@gmail.com (sampai company10@gmail.com) | Password: password123")
    print("Candidate: pelamar1@gmail.com (sampai pelamar100@gmail.com) | Password: password123")
    print("="*50)

if __name__ == "__main__":
    seed_database()
