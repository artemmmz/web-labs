from datetime import datetime

from pydantic import BaseModel


class Tokens(BaseModel):
    """Access and refresh tokens model."""

    access_token: str
    refresh_token: str | None = None
    token_type: str = 'Bearer'
