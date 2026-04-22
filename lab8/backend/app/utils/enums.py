from enum import Enum


class TokenType(str, Enum):
    """Token type enum."""

    ACCESS = 'access'
    REFRESH = 'refresh'
