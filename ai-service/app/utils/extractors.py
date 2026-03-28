from io import BytesIO
from docx import Document as DocxDocument
from pypdf import PdfReader


def extract_text(filename: str, content: bytes) -> str:
    lower = filename.lower()
    if lower.endswith(".pdf"):
        return _extract_pdf(content)
    if lower.endswith(".docx"):
        return _extract_docx(content)
    raise ValueError("Unsupported file type")


def _extract_pdf(content: bytes) -> str:
    reader = PdfReader(BytesIO(content))
    pages = [p.extract_text() or "" for p in reader.pages]
    return "\n".join(pages)


def _extract_docx(content: bytes) -> str:
    doc = DocxDocument(BytesIO(content))
    return "\n".join(p.text for p in doc.paragraphs)
