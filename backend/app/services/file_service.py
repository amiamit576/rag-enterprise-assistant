import shutil
from pathlib import Path
from fastapi import UploadFile

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".docx",
    ".txt"
}


def save_file(file: UploadFile, upload_dir: Path):
    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise ValueError("Unsupported file type")

    destination = upload_dir / file.filename

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return destination