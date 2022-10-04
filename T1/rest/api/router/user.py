from crypt import methods
from http import HTTPStatus
from flask import Blueprint, Response, request

blueprint = Blueprint("user", __name__)

@blueprint.post("/auth")
def auth():
    ...

@blueprint.patch("/")
def udpate():
    ...

@blueprint.delete("/")
def delete():
    ...

@blueprint.post("logout")
def logout():
    ...