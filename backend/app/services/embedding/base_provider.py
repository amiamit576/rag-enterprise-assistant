from abc import ABC, abstractmethod
from typing import Sequence


class BaseEmbeddingProvider(ABC):
    """Interface for embedding providers."""

    @abstractmethod
    def embed_documents(self, texts: Sequence[str]) -> list[list[float]]:
        """Return embeddings for the provided texts."""
        raise NotImplementedError
