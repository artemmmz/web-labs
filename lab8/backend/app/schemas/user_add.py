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

    @model_validator(mode='after')
    def check_passwords_match(self) -> Self:
        if self.password1 != self.password2:
            raise ValueError('Passwords do not match')
        return self

