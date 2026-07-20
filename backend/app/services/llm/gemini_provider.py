from google import genai
import os


class GeminiProvider:

    def __init__(self):
        self.client = genai.Client(
            api_key=os.getenv("GEMINI_API_KEY")
        )

        self.models = [
            "gemini-3.5-flash",
            "gemini-3.1-flash-lite",
            "gemini-1.5-flash",
        ]

    def generate(self, prompt):

        for model_name in self.models:
            try:
                print(f"Trying {model_name}")

                response = self.client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                )

                print(f"✓ Using {model_name}")

                return response.text

            except Exception as e:
                print(f"❌ {model_name} failed")
                print(e)

        raise Exception("All Gemini models failed.")