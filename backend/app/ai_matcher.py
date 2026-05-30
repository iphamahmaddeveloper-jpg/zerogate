from sentence_transformers import SentenceTransformer, util
import torch

# Load model secara global (akan di-download saat pertama kali dijalankan)
MODEL_NAME = 'all-MiniLM-L6-v2'
model = SentenceTransformer(MODEL_NAME)

def generate_embedding(text: str) -> list:
    """Mengubah teks menjadi list float (vektor embedding)."""
    embedding = model.encode(text, convert_to_tensor=False)
    return embedding.tolist()

def calculate_similarity_from_embeddings(job_emb: list, cand_emb: list) -> float:
    """Menghitung cosine similarity dari dua vektor."""
    if not job_emb or not cand_emb:
        return 0.0
        
    # Ubah list ke tensor
    t1 = torch.tensor(job_emb)
    t2 = torch.tensor(cand_emb)
    
    try:
        cosine_score = util.cos_sim(t1, t2).item()
        matching_percentage = max(0.0, cosine_score) * 100
        return round(matching_percentage, 2)
    except Exception as e:
        print(f"Error calculating similarity: {e}")
        return 0.0

def analyze_skill_gap(required_skills_text: str, candidate_skills_text: str) -> dict:
    """Mencari skill yang kurang berdasarkan pencocokan kata dasar sederhana."""
    if not required_skills_text or not candidate_skills_text:
        return {"missing_skills": [], "recommendation": ""}
        
    # Ekstrak kata-kata, asumsikan dipisah koma
    req_set = set([s.lower().strip() for s in required_skills_text.split(',')])
    cand_set = set([s.lower().strip() for s in candidate_skills_text.split(',')])
    
    missing_skills = list(req_set - cand_set)
    
    if missing_skills:
        rec = f"Tingkatkan: {', '.join(missing_skills[:3])}"
    else:
        rec = "Skill sangat sesuai!"
        
    return {
        "missing_skills": missing_skills[:5],
        "recommendation": rec
    }
