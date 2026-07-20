from app.services.embedding.embedding_service import EmbeddingService
from app.services.vector_store import VectorStore
from app.services.llm.llm_service import LLMService


class ChatService:

    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.vector_store = VectorStore()
        self.llm_service = LLMService()

    def ask(self, question: str):

        # Generate embedding for question
        query_embedding = self.embedding_service.generate_embeddings(
            [question]
        )[0]

        # Search ChromaDB
        results = self.vector_store.search(
            query_embedding=query_embedding,
            top_k=5,
        )

        # No matching documents
        if (
            not results["documents"]
            or len(results["documents"][0]) == 0
        ):
            return {
                "answer": "No relevant documents found.",
                "sources": [],
            }

        documents = results["documents"][0]
        metadatas = results["metadatas"][0]

        # Remove duplicate source metadata
        unique_sources = []

        for metadata in metadatas:
            if metadata not in unique_sources:
                unique_sources.append(metadata)

        # Build context
        context = "\n\n".join(documents)

        prompt = f"""
You are an Enterprise AI Assistant.

Answer ONLY using the context below.

If the answer is not present in the context, reply exactly:

'I could not find that information in the uploaded documents.'

Context:
{context}

Question:
{question}
"""

        try:
            answer = self.llm_service.generate(prompt)

        except Exception as e:
            print(e)

            return {
                "answer": "All AI providers are currently unavailable. Please try again later.",
                "sources": unique_sources,
            }

        return {
            "answer": answer,
            "sources": unique_sources,
        }