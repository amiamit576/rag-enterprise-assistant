from typing import Sequence
import os

from google import genai

from .base_provider import BaseEmbeddingProvider


class GeminiEmbeddingProvider(BaseEmbeddingProvider):

    def __init__(self):
        self.client = genai.Client(
            api_key=os.getenv("GEMINI_API_KEY")
        )

    def embed_documents(
        self,
        texts: Sequence[str],
    ) -> list[list[float]]:

        embeddings = []

        for text in texts:
            response = self.client.models.embed_content(
                model="gemini-embedding-001",
                contents=text,
            )

            embeddings.append(response.embeddings[0].values)

        return embeddings