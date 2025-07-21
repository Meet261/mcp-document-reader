
import fitz  # PyMuPDF
import tempfile
import requests

def extract_text_from_url(url, page_number):
    response = requests.get(url)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(response.content)
        tmp_path = tmp.name

    doc = fitz.open(tmp_path)
    page = doc.load_page(page_number)
    text = page.get_text()
    doc.close()
    return text
