from fastapi import FastAPI

from app.api.routes import router
from app.core.logger import configure_logging

configure_logging()

app = FastAPI(title="Legal Helper AI Service", version="1.0.0")


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(router)
