#!/bin/sh

# This can cause problems #
killall python

# CTRL + SHIFT + R for hard refresh in chrome # 

 python tools/server.py & "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" --disable-web-security --user-data-dir "http://localhost:8000/pages/index.html"
