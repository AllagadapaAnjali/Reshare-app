import streamlit as st
import streamlit.components.v1 as components
import os

st.set_page_config(page_title="ReShare App", layout="wide")

# Path to React build inside client folder
build_path = os.path.join(os.getcwd(), "client", "build", "index.html")

if os.path.exists(build_path):
    with open(build_path, "r", encoding="utf-8") as f:
        html_code = f.read()
    components.html(html_code, height=800, scrolling=True)
else:
    st.error("⚠️ Build folder not found. Please run `npm run build` inside the client folder.")
