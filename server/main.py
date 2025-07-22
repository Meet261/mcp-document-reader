from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from reader import extract_text_from_url
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Get frontend origin from .env or allow all in dev
frontend_origin = os.getenv("FRONTEND_ORIGIN", "*")

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class ReadRequest(BaseModel):
    url: str
    page: int

# Health check endpoint
@app.get("/ping")
def ping():
    return {"status": "ok"}

# Endpoint to extract text from a PDF page
@app.post("/read")
def read_page(req: ReadRequest):
    try:
        text = extract_text_from_url(req.url, req.page)
        return {
            "message": f"Text extracted from page {req.page}",
            "page": req.page,
            "text": text
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
