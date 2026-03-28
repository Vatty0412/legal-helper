from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    query: str = Field(min_length=1)
    sessionId: str
    userId: str
    useRag: bool = True


class PdfChatRequest(BaseModel):
    query: str = Field(min_length=1)
    fileId: str
    sessionId: str
    userId: str


class Citation(BaseModel):
    documentId: str
    chunkId: str
    text: str
    score: float


class TokenUsage(BaseModel):
    inputTokens: int = 0
    outputTokens: int = 0
    totalTokens: int = 0


class ChatResponse(BaseModel):
    answer: str
    citations: list[Citation] = []
    tokenUsage: TokenUsage
