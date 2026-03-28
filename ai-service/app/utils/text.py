from typing import List


def chunk_text(text: str, chunk_size: int, chunk_overlap: int) -> List[str]:
    cleaned = " ".join(text.split())
    if not cleaned:
        return []

    chunks: list[str] = []
    step = max(1, chunk_size - chunk_overlap)
    for i in range(0, len(cleaned), step):
        chunk = cleaned[i : i + chunk_size]
        if chunk.strip():
            chunks.append(chunk)
        if i + chunk_size >= len(cleaned):
            break
    return chunks
