from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .weather import get_weather_data

app = FastAPI()

# Настройка CORS для доступа из браузера
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/weather")
async def weather(city: str):
    try:
        return await get_weather_data(city)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok"}