import re
from typing import Self

from pydantic import BaseModel, Field, EmailStr, SecretStr, model_validator, field_validator


class UserAddSchema(BaseModel):
    login: str = Field(min_length=3, max_length=50)
    email: EmailStr
    firstname: str
    lastname: str
    password1: SecretStr
    password2: SecretStr

    @field_validator('login')  # noqa
    @classmethod
    def validate_username(cls, v):
        if not re.match(r'^[a-z0-9_-]*$', v):
            raise ValueError(
                'Login must contain only lowercase letters, '
                'numbers and underscore'
            )
        return v

    @field_validator('password2')  # noqa
    @classmethod
    def validate_password(cls, v: SecretStr) -> SecretStr:
        password = v.get_secret_value()
        if len(password) < 6:
            raise ValueError('Password must be at least 6 characters')
        if not re.search(r'[A-Z]', password):
            raise ValueError(
                'Password must contain at least one uppercase letter'
            )
        if not re.search(r'[a-z]', password):
            raise ValueError(
                'Password must contain at least one lowercase letter'
            )
        if not re.search(r'\d', password):
            raise ValueError('Password must contain at least one number')
        if not re.search(r'\W', password):
            raise ValueError(
                'Password must contain at least one special character'
            )
        return v

    @model_validator(mode='after')
    def check_passwords_match(self) -> Self:
        if self.password1 != self.password2:
            raise ValueError('Passwords do not match')
        return self

