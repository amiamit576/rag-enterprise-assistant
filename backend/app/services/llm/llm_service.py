from .gemini_provider import GeminiProvider
from .openrouter_provider import OpenRouterProvider
from .grok_provider import GrokProvider


class LLMService:

    def __init__(self):

        self.providers = [
            GeminiProvider(),
            OpenRouterProvider(),
            GrokProvider(),
        ]

    def generate(self, prompt):

        for provider in self.providers:
            try:
                return provider.generate(prompt)

            except Exception as e:
                print(e)
                continue

        raise Exception(
            "All AI providers are unavailable."
        )