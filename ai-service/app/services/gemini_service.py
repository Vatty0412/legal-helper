from __future__ import annotations

import hashlib
from typing import Any
from google import genai
from google.genai import types

from app.core.config import get_settings

settings = get_settings()

client: genai.Client | None = None

if settings.gemini_api_key:
    client = genai.Client(api_key=str(settings.gemini_api_key))


def _fallback_embedding(text: str, dim: int = 768) -> list[float]:
    digest = hashlib.sha256(text.encode("utf-8")).digest()
    seed = int.from_bytes(digest[:8], "big")
    values = []
    state = seed
    for _ in range(dim):
        state = (1664525 * state + 1013904223) & 0xFFFFFFFF
        values.append((state / 0xFFFFFFFF) * 2 - 1)
    return values


def embed_text(text: str) -> list[float]:
    if not client:
        return _fallback_embedding(text)

    response = client.models.embed_content(
        model=settings.gemini_embed_model,
        contents=text,
    )
    return response.embeddings[0].values


def generate_answer(prompt: str) -> tuple[str, dict[str, int]]:
    if not client:
        answer = "Gemini API key is not configured. This is a fallback response."
        usage = {
            "inputTokens": len(prompt) // 4,
            "outputTokens": len(answer) // 4,
            "totalTokens": (len(prompt) + len(answer)) // 4,
        }
        return answer, usage

    response = client.models.generate_content(
        model=settings.gemini_model,
        contents=prompt,
    )
    text = response.text or "No response generated."
    meta = response.usage_metadata
    usage = {
        "inputTokens": int(meta.prompt_token_count or 0),
        "outputTokens": int(meta.candidates_token_count or 0),
        "totalTokens": int(meta.total_token_count or 0),
    }
    return text, usage