from pathlib import Path
from dotenv import load_dotenv
import os

BASE_DIR = Path(__file__).resolve().parent.parent.parent

load_dotenv(BASE_DIR / ".env")

# API Keys
HF_TOKEN = os.getenv("HF_TOKEN")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
GROK_API_KEY = os.getenv("GROK_API_KEY")

# Upload directory
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

print("GEMINI:", "FOUND" if GEMINI_API_KEY else "NOT FOUND")
print("OPENROUTER:", "FOUND" if OPENROUTER_API_KEY else "NOT FOUND")
print("GROK:", "FOUND" if GROK_API_KEY else "NOT FOUND")