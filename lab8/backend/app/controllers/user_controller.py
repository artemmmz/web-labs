from fastapi import APIRouter

from app.core.dependencies import UserAnnotation
from app.schemas.user_response import UserResponseSchema

router = APIRouter()

@router.get('/profile')
async def profile(user: UserAnnotation) -> UserResponseSchema:
    """Get the current user."""
    return UserResponseSchema(
        login=user.login,
        email=user.email,
        firstname=user.firstname,
        lastname=user.lastname,
    )
