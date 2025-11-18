#!/usr/bin/env python3
import subprocess
import sys

def install_package(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

if __name__ == "__main__":
    try:
        install_package("gtts")
        print("gTTS installed successfully!")
    except Exception as e:
        print(f"Error installing gTTS: {e}")
        sys.exit(1)