from pydantic import BaseModel


class UserResponseSchema(BaseModel):
    login: str
    firstname: str
    lastname: str
    email: str
