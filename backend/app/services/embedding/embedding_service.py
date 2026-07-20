from .local_provider import LocalEmbeddingProvider
from .gemini_provider import GeminiEmbeddingProvider

class EmbeddingService:

    def __init__(self):
        self.provider = None

        try:
            print("=" * 50)
            print("Trying Local Embedding Model")
            print("=" * 50)

            self.provider = LocalEmbeddingProvider()

            print("✓ Local model loaded")

        except Exception as e:
            print(e)

            print("=" * 50)
            print("Switching to Gemini Embeddings")
            print("=" * 50)

            self.provider = GeminiEmbeddingProvider()

    def generate_embeddings(self, texts):
        return self.provider.embed_documents(texts)

    def __init__(self):
        self.provider = None

        try:
            print("=" * 50)
            print("Trying Local Embedding Model")
            print("=" * 50)

            self.provider = LocalEmbeddingProvider()

            print("✓ Local model loaded")

        except Exception as e:
            print(e)

            print("=" * 50)
            print("Switching to Gemini Embeddings")
            print("=" * 50)

            self.provider = GeminiEmbeddingProvider()

    def generate_embeddings(self, texts):
        return self.provider.embed_documents(texts)

    def __init__(self):

        self.provider = None

        try:

            print("="*50)
            print("Trying Local Embedding Model")
            print("="*50)

            self.provider = LocalEmbeddingProvider()

            print("✓ Local model loaded")

        except Exception as e:

            print(e)

            print("="*50)
            print("Switching to Gemini Embeddings")
            print("="*50)

            self.provider = GeminiEmbeddingProvider()

    def embed(self, texts):

        self.provider.embed_documents(texts)