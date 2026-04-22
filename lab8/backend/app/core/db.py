from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


def create_sessionmaker():
    engine = create_async_engine(settings.ASYNC_SQLITE_URL, future=True, echo=True)

    async_session = sessionmaker(  # type: ignore
        engine, expire_on_commit=False, class_=AsyncSession
    )
    return async_session


async def get_db() -> AsyncSession:
    """Get database session."""
    async_session = create_sessionmaker()
    async with async_session() as session:
        return session
