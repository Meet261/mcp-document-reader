from gtts import gTTS
import os
import tempfile

def speak_text(text):
    tts = gTTS(text)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
        tts.save(tmp.name)
        os.system(f"mpg123 {tmp.name}")  # if you're playing it locally
