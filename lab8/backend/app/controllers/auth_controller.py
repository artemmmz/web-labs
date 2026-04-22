from fastapi import APIRouter, HTTPException

from app.core.dependencies import DBAnnotation
from app.core.security import create_access_token, create_refresh_token, verify_password
from app.schemas import UserAddSchema, UserLoginSchema
from app.schemas.tokens import Tokens
from app.services import UserService

router = APIRouter()


@router.post('/register/')
async def register(data: UserAddSchema, uow: DBAnnotation) -> Tokens:
    """Register a new user."""
    try:
        user = await UserService.add_user(uow, data)
    except:
        raise HTTPException(status_code=400, detail='User already exists')

    access_token = create_access_token(
        user_id=user.id,
        username=user.login,
    )
    refresh_token = create_refresh_token(
        user_id=user.id,
        username=user.login,
    )
    return Tokens(access_token=access_token, refresh_token=refresh_token)



@router.post('/login/')
async def login(data: UserLoginSchema, uow: DBAnnotation) -> Tokens:
    """Authenticate a user."""
    user = await UserService.get_user(uow, login=data.login)
    if user is None:
        raise HTTPException(status_code=400, detail='Invalid login or password')
    if not verify_password(data.password.get_secret_value(), user.hashed_password):
        raise HTTPException(status_code=400, detail='Invalid login or password')
    access_token = create_access_token(
        user_id=user.id,
        username=user.login,
    )
    refresh_token = create_refresh_token(
        user_id=user.id,
        username=user.login,
    )
    return Tokens(access_token=access_token, refresh_token=refresh_token)
