import os
from typing import Sequence
from sentence_transformers import SentenceTransformer

from app.core.config import HF_TOKEN
from .base_provider import BaseEmbeddingProvider


class LocalEmbeddingProvider(BaseEmbeddingProvider):

    def __init__(self):

        if HF_TOKEN:
            os.environ["HF_TOKEN"] = HF_TOKEN

        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    def embed_documents(
        self,
        texts: Sequence[str],
    ) -> list[list[float]]:
        return self.model.encode(
            list(texts),
            normalize_embeddings=True,
        ).tolist()