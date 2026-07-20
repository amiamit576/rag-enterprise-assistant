import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

for model in client.models.list():
    print("=" * 60)
    print("Name :", model.name)

    if hasattr(model, "supported_actions"):
        print("Supported Actions:", model.supported_actions)

    if hasattr(model, "supported_generation_methods"):
        print("Generation Methods:", model.supported_generation_methods)