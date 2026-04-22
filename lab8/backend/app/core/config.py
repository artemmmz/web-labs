import datetime
import secrets

from pydantic_settings import BaseSettings
from pydantic import Field, computed_field


class Settings(BaseSettings):
    SQLITE_URL: str = 'sqlite:///sqlite3.db'

    JWT_ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    JWT_SECRET: str = Field(default_factory=lambda: secrets.token_urlsafe(32))

    BACKEND_CORS_ORIGINS: list[str] = ['*']

    @computed_field  # type: ignore
    @property
    def ACCESS_TOKEN_EXPIRE_TIMEDELTA(self) -> datetime.timedelta:
        return datetime.timedelta(minutes=self.ACCESS_TOKEN_EXPIRE_MINUTES)

    @computed_field  # type: ignore
    @property
    def REFRESH_TOKEN_EXPIRE_TIMEDELTA(self) -> datetime.timedelta:
        return datetime.timedelta(days=self.REFRESH_TOKEN_EXPIRE_DAYS)

    @computed_field
    @property
    def ASYNC_SQLITE_URL(self) -> str:
        return self.SQLITE_URL.replace('sqlite://', 'sqlite+aiosqlite://')


settings = Settings()
