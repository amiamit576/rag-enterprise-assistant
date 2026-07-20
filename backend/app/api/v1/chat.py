from fastapi import APIRouter, HTTPException

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

chat_service = ChatService()


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        return chat_service.ask(request.question)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))