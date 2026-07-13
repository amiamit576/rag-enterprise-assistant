from pathlib import Path

from docx import Document
from pypdf import PdfReader


class DocumentLoader:

    @staticmethod
    def load(file_path: Path):

        extension = file_path.suffix.lower()

        loaders = {
            ".pdf": DocumentLoader.read_pdf,
            ".docx": DocumentLoader.read_docx,
            ".txt": DocumentLoader.read_txt,
        }

        loader = loaders.get(extension)

        if not loader:
            raise ValueError(f"Unsupported file type: {extension}")

        return loader(file_path)

    @staticmethod
    def read_pdf(file_path: Path):

        reader = PdfReader(file_path)

        pages = []

        for index, page in enumerate(reader.pages):

            pages.append(
                {
                    "page": index + 1,
                    "text": page.extract_text() or ""
                }
            )

        return pages

    @staticmethod
    def read_docx(file_path: Path):

        document = Document(file_path)

        text = "\n".join(
            paragraph.text
            for paragraph in document.paragraphs
        )

        return [
            {
                "page": 1,
                "text": text
            }
        ]

    @staticmethod
    def read_txt(file_path: Path):

        return [
            {
                "page": 1,
                "text": file_path.read_text(encoding="utf-8")
            }
        ]