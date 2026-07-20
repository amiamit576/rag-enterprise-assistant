import requests
import os


class OpenRouterProvider:

    def generate(self, prompt):

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization":
                f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
                "Content-Type": "application/json",
            },
            json={
                "model": "openai/gpt-4o",
                "messages": [
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ]
            }
        )

        data = response.json()

        return data["choices"][0]["message"]["content"]