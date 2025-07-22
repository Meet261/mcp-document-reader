from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pypdf import PdfReader
import tempfile

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Consider restricting this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pdf_path = None

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global pdf_path
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        pdf_path = tmp.name
    return {"message": "Uploaded"}

# ✅ Handle CORS preflight (OPTIONS request)
@app.options("/read")
async def options_read():
    return JSONResponse(content={"status": "ok"})

@app.post("/read")
async def read_page(request: Request):
    global pdf_path
    try:
        data = await request.json()
        page_num = int(data.get("page", 1)) - 1
        reader = PdfReader(pdf_path)
        text = reader.pages[page_num].extract_text()
        return {"text": text}
    except Exception as e:
        return {"error": str(e)}
