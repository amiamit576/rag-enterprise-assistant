import requests
import os


class GrokProvider:

    def generate(self, prompt):

        response = requests.post(
            "https://api.x.ai/v1/chat/completions",
            headers={
                "Authorization":
                f"Bearer {os.getenv('GROK_API_KEY')}",
                "Content-Type": "application/json",
            },
            json={
                "model": "grok-4",
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