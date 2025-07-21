
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from reader import extract_text_from_url
from speaker import speak_text

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReadRequest(BaseModel):
    url: str
    page: int

@app.post("/read")
def read_page(req: ReadRequest):
    text = extract_text_from_url(req.url, req.page)
    speak_text(text)
    return {"message": f"Reading page {req.page}"}
