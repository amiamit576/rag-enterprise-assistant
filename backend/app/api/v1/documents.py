import uuid
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.core.config import UPLOAD_DIR
from app.services.chunker import TextChunker
from app.services.document_loader import DocumentLoader
from app.services.embedding.embedding_service import EmbeddingService
from app.services.file_service import save_file
from app.services.vector_store import VectorStore

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


# ==========================================================
# Upload Document
# ==========================================================
@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    try:

        # ----------------------------------------
        # Step 1: Save uploaded file
        # ----------------------------------------
        saved_file = save_file(file, UPLOAD_DIR)

        # ----------------------------------------
        # Step 2: Extract text
        # ----------------------------------------
        pages = DocumentLoader.load(saved_file)

        # ----------------------------------------
        # Step 3: Chunk text
        # ----------------------------------------
        processed_chunks = []

        for page in pages:

            text = page.get("text", "")

            chunks = TextChunker.chunk_text(text)

            for index, chunk in enumerate(chunks):

                processed_chunks.append(
                    {
                        "page": page["page"],
                        "chunk_number": index + 1,
                        "text": chunk,
                    }
                )

        # ----------------------------------------
        # Step 4: Generate Embeddings
        # ----------------------------------------
        embedding_service = EmbeddingService()

        texts = [chunk["text"] for chunk in processed_chunks]

        embeddings = embedding_service.generate_embeddings(texts)

        # ----------------------------------------
        # Step 5: Create Vector IDs
        # ----------------------------------------
        ids = [
            str(uuid.uuid4())
            for _ in processed_chunks
        ]

        # ----------------------------------------
        # Step 6: Metadata
        # ----------------------------------------
        metadatas = [
            {
                "page": chunk["page"],
                "chunk": chunk["chunk_number"],
                "filename": saved_file.name,
            }
            for chunk in processed_chunks
        ]

        # ----------------------------------------
        # Step 7: Store in ChromaDB
        # ----------------------------------------
        vector_store = VectorStore()

        vector_store.add_documents(
            ids=ids,
            documents=texts,
            embeddings=embeddings,
            metadatas=metadatas,
        )

        # ----------------------------------------
        # Step 8: Response
        # ----------------------------------------
        return {
            "filename": saved_file.name,
            "file_type": saved_file.suffix,
            "pages": len(pages),
            "chunks": len(processed_chunks),
            "vectors": len(embeddings),
            "status": "Document processed and stored successfully in ChromaDB",
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ==========================================================
# List Uploaded Documents
# ==========================================================
@router.get("")
def get_documents():

    documents = []

    upload_path = Path(UPLOAD_DIR)

    if not upload_path.exists():
        return []

    for file in upload_path.iterdir():

        if file.is_file():

            documents.append(
                {
                    "filename": file.name,
                    "file_type": file.suffix,
                    "size": round(file.stat().st_size / 1024, 2),
                    "status": "Indexed",
                }
            )

    documents.sort(
        key=lambda x: x["filename"].lower()
    )

    return documents