from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from reader import extract_text_from_url
from speaker import speak_text
import os
from dotenv import load_dotenv
load_dotenv()


app = FastAPI()

# Load frontend origin from env
frontend_origin = os.getenv("FRONTEND_ORIGIN", "*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReadRequest(BaseModel):
    url: str
    page: int

@app.post("/read")
def read_and_speak(req: ReadRequest):
    try:
        text = extract_text_from_url(req.url, req.page)
        speak_text(text)
        return {"message": f"Reading page {req.page}", "text": text}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/text")
def extract_text(req: ReadRequest):
    try:
        text = extract_text_from_url(req.url, req.page)
        return {"page": req.page, "text": text}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/ping")
def ping():
    return {"status": "alive"}
