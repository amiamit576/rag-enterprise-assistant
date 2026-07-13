from fastapi import FastAPI

from app.api.v1.documents import router as document_router

app = FastAPI(
    title="RAG Enterprise Assistant",
    version="1.0.0"
)

app.include_router(document_router, prefix="/api/v1")


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }