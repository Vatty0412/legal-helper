from __future__ import annotations

from uuid import uuid5, NAMESPACE_URL
from qdrant_client import QdrantClient
from qdrant_client.http import models as rest

from app.core.config import get_settings

settings = get_settings()
client = QdrantClient(url=settings.qdrant_url, api_key=settings.qdrant_api_key or None)


def ensure_collection(vector_size: int = 768) -> None:
    collections = client.get_collections().collections
    names = {c.name for c in collections}
    if settings.qdrant_collection in names:
        return

    client.create_collection(
        collection_name=settings.qdrant_collection,
        vectors_config=rest.VectorParams(size=vector_size, distance=rest.Distance.COSINE)
    )


def upsert_chunks(file_id: str, user_id: str, checksum: str, chunks: list[str], embeddings: list[list[float]]) -> None:
    ensure_collection(len(embeddings[0]) if embeddings else 768)
    points: list[rest.PointStruct] = []

    for idx, (chunk, vector) in enumerate(zip(chunks, embeddings)):
        pid = str(uuid5(NAMESPACE_URL, f"{file_id}:{idx}"))
        points.append(
            rest.PointStruct(
                id=pid,
                vector=vector,
                payload={
                    "file_id": file_id,
                    "user_id": user_id,
                    "chunk_id": str(idx),
                    "text": chunk,
                    "checksum": checksum
                }
            )
        )

    if points:
        client.upsert(collection_name=settings.qdrant_collection, points=points)


def search(query_embedding: list[float], user_id: str, top_k: int, file_id: str | None = None):
    must = [rest.FieldCondition(key="user_id", match=rest.MatchValue(value=user_id))]
    if file_id:
        must.append(rest.FieldCondition(key="file_id", match=rest.MatchValue(value=file_id)))

    query_filter = rest.Filter(must=must)
    return client.search(
        collection_name=settings.qdrant_collection,
        query_vector=query_embedding,
        query_filter=query_filter,
        limit=top_k,
        with_payload=True
    )
