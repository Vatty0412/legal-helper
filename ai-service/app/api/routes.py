from fastapi import APIRouter, BackgroundTasks, File, Form, UploadFile

from app.schemas.chat import ChatRequest, ChatResponse, PdfChatRequest
from app.services.gemini_service import generate_answer
from app.services.ingestion import process_document
from app.services.rag import run_rag

router = APIRouter()


@router.post("/upload")
async def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    file_id: str = Form(...),
    user_id: str = Form(...),
    checksum: str = Form(...)
):
    file_bytes = await file.read()
    background_tasks.add_task(process_document, file_bytes, file.filename, file_id, user_id, checksum)
    return {"message": "Processing started", "fileId": file_id}


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    if not request.useRag:
        answer, usage = generate_answer(
            "You are Legal Helper, an AI legal assistant. Answer the question clearly.\n\n"
            f"User question: {request.query}"
        )
        return {"answer": answer, "citations": [], "tokenUsage": usage}

    return run_rag(query=request.query, user_id=request.userId, top_k=5)


@router.post("/pdf/chat", response_model=ChatResponse)
def pdf_chat(request: PdfChatRequest):
    return run_rag(query=request.query, user_id=request.userId, top_k=5, file_id=request.fileId)
