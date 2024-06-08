from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import random
import json

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Set up Jinja2 templates
templates = Jinja2Templates(directory="templates")

# Load sidebar items from JSON
with open('sidebar.json') as f:
    sidebar_items = json.load(f)

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "sidebar_items": sidebar_items, "page_title": "Home"})

@app.get("/page1", response_class=HTMLResponse, name="read_page1")
async def read_page1(request: Request):
    return templates.TemplateResponse("page1.html", {"request": request, "sidebar_items": sidebar_items, "page_title": "Tool 1"})

@app.get("/page2", response_class=HTMLResponse, name="read_page2")
async def read_page2(request: Request):
    return templates.TemplateResponse("page2.html", {"request": request, "sidebar_items": sidebar_items, "page_title": "Tool 2"})

@app.get("/api/data")
async def get_data(param: int = 1):
    data = {'values': [random.randint(0, 100) for _ in range(param)]}
    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
