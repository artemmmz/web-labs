from pydantic import BaseModel, SecretStr


class UserLoginSchema(BaseModel):
    login: str
    password: SecretStr
