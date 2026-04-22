"""Dependencies module."""

import uuid
from typing import Annotated, Dict, Any

from fastapi import Depends, HTTPException

from app.core.auth_bearer import JWTBearer
from app.core.security import decode_token
from app.models.user import User
from app.services import UserService
from app.uow.database import SQLAlchemyUOW, IDatabaseUnitOfWork
from app.utils.enums import TokenType


# UOW Section
def create_db_uow() -> IDatabaseUnitOfWork:
    """Create and initialize Unit Of Work instance."""
    return SQLAlchemyUOW()


DBDep = Depends(create_db_uow)
DBAnnotation = Annotated[IDatabaseUnitOfWork, DBDep]


# Authentication Section
async def get_current_token_payload(token: str = Depends(JWTBearer())):
    """
    Check token and get token payload.

    :param token: JWT Token.
    :return: Token payload.
    """
    payload = decode_token(token)
    token_id = uuid.UUID(payload['jti'])
    return payload


TokenDep = Depends(get_current_token_payload)
TokenAnnotation = Annotated[Dict[str, Any], TokenDep]


async def __get_current_user(
    uow: DBAnnotation, payload: Dict[str, Any], by_token: TokenType
) -> User:
    """Get current user."""
    if payload is None:
        raise HTTPException(status_code=401, detail='Unauthorized')
    if payload['type'] != by_token.value:
        raise HTTPException(status_code=401, detail='Unauthorized')
    try:
        user = await UserService.get_user_by_id(uow, payload['user_id'])
        return user
    except:
        raise HTTPException(status_code=401, detail='Unauthorized')


async def get_current_user(
    uow: DBAnnotation, payload: TokenAnnotation
) -> User:
    """
    Get current user.

    :param uow: Unit Of Work instance.
    :param payload: Token payload.
    :return: Current active user.
    """
    return await __get_current_user(uow, payload, TokenType.ACCESS)


async def get_current_user_by_refresh(
    uow: DBAnnotation, payload: TokenAnnotation
) -> User:
    """
    Get current user by refresh token.

    :param uow: Unit Of Work instance.
    :param payload: Token payload.
    :return: Current active user.
    """
    return await __get_current_user(uow, payload, TokenType.REFRESH)


UserDep = Depends(get_current_user)
UserAnnotation = Annotated[User, UserDep]
