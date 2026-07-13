from fastapi import APIRouter, File, HTTPException, UploadFile

from app.core.config import UPLOAD_DIR
from app.services.chunker import TextChunker
from app.services.document_loader import DocumentLoader
from app.services.file_service import save_file

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    try:

        # Save uploaded file
        saved_file = save_file(file, UPLOAD_DIR)

        # Extract text
        pages = DocumentLoader.load(saved_file)

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

        return {
            "filename": saved_file.name,
            "pages": len(pages),
            "chunks": len(processed_chunks),
            "preview": processed_chunks[:3],
            "message": "Document processed successfully",
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))