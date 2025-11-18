import sys
from gtts import gTTS
import os

if len(sys.argv) != 3:
    print("Usage: python tts.py <text> <output_file>")
    sys.exit(1)

text = sys.argv[1]
output_file = sys.argv[2]

try:
    tts = gTTS(text=text, lang='en', slow=False)
    tts.save(output_file)
    print("SUCCESS")
except Exception as e:
    print(f"ERROR: {str(e)}")
    sys.exit(1)