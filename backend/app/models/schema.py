from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import datetime
from ..database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False) # 'candidate' or 'company'
    
    # Relationships
    candidate_profile = relationship("CandidateProfile", back_populates="user", uselist=False)
    job_postings = relationship("JobPosting", back_populates="company")

class JobPosting(Base):
    __tablename__ = "job_postings"
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    department = Column(String)
    experience_level = Column(String) # e.g., Junior, Mid, Senior
    contract_type = Column(String) # e.g., Full-time, Contract
    work_scheme = Column(String) # e.g., Remote, On-site, Hybrid
    location = Column(String)
    salary_range = Column(String)
    description = Column(Text, nullable=False)
    
    # Store Arrays as JSON strings
    hard_skills = Column(Text) 
    soft_skills = Column(Text)
    
    # Legacy field for MVP backward compatibility just in case
    requirements = Column(Text)
    
    embedding_json = Column(Text)
    
    company = relationship("User", back_populates="job_postings")
    applications = relationship("JobApplication", back_populates="job")

class CandidateProfile(Base):
    __tablename__ = "candidate_profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Core Info
    photo_url = Column(String)
    full_name = Column(String, nullable=False)
    title = Column(String) # Profesional Title
    summary = Column(Text)
    
    # Contact & Preferences
    contact_email = Column(String)
    contact_whatsapp = Column(String)
    location = Column(String)
    contract_preference = Column(String)
    work_scheme_preference = Column(String)
    
    # Complex Data (Stored as JSON strings)
    education = Column(Text)
    experience = Column(Text)
    hard_skills = Column(Text)
    soft_skills = Column(Text)
    
    # Legacy for backward compatibility
    skills = Column(Text)
    
    parsed_cv_json = Column(Text) # Result from LLM
    embedding_json = Column(Text)
    
    user = relationship("User", back_populates="candidate_profile")
    applications = relationship("JobApplication", back_populates="candidate")

class JobApplication(Base):
    __tablename__ = "job_applications"
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("job_postings.id"))
    candidate_id = Column(Integer, ForeignKey("candidate_profiles.id"))
    status = Column(String, default="pending") # 'pending', 'accepted', 'rejected'
    applied_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    job = relationship("JobPosting", back_populates="applications")
    candidate = relationship("CandidateProfile", back_populates="applications")
