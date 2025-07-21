
# 🗣️ MCP Document Reader

This project is a **full-stack document reader app** that lets users:

- Upload a PDF via URL
- Scroll through pages
- Click a button to **read a specific page out loud** using text-to-speech

Built using:
- 📦 `FastAPI` for backend
- 🎨 `React + Tailwind` for frontend
- 🗣️ `pyttsx3` for local TTS (offline)
- 📄 `PyMuPDF` for PDF parsing

## 🎬 Preview

| Upload a URL | View the Document | Read the Page Out Loud |
|--------------|-------------------|-------------------------|
| ![upload_ui](screenshots/upload_ui.png) | ![pdf_viewer](screenshots/pdf_viewer.png) | ![reading_out_loud](screenshots/reading_out_loud.png) |

## 🚀 How to Run It

### 1. Backend

```bash
cd server
pip install -r requirements.txt
python main.py
```

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

## 🧠 Cheat Code

> Upload a document, scroll to a page, click “Read,” and this app speaks the content aloud — all locally.
