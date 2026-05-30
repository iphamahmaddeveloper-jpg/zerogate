from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .models import schema
from .api import auth, jobs

# Buat tabel berdasarkan schema baru
schema.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Zero Gate MVP API")

# Konfigurasi CORS agar frontend React bisa memanggil API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Izinkan semua asal untuk development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(jobs.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Zero Gate API"}
