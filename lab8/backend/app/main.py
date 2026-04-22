import uvicorn
from fastapi import FastAPI

from app.controllers import auth_router, user_router


def get_app():
    app = FastAPI()
    app.include_router(auth_router, prefix='/api/v1/auth')
    app.include_router(user_router, prefix='/api/v1/user')

    return app


if __name__ == 'main':
    uvicorn.run(get_app(), reload=True)
