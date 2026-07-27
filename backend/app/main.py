import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.documents import router as document_router
from app.api.v1.chat import router as chat_router

app = FastAPI(
    title="RAG Enterprise Assistant",
    version="1.0.0",
)

# Allowed Frontend Origins
origins = [
    "http://localhost:5173",                 # Local Vite
    "http://127.0.0.1:5173",
]

# Add Netlify URL from environment variable if available
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(document_router, prefix="/api/v1")
app.include_router(chat_router, prefix="/api/v1")


@app.get("/")
def root():
    return {
        "message": "Enterprise RAG Assistant API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }