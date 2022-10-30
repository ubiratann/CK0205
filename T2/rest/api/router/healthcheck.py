from ast import Raise
import json

from http import HTTPStatus
from flask import Blueprint, Response
from flask_cors import CORS
from api.service.mysql_connector import DatabaseConnector
from api.utils.dynamodb import get_item


blueprint = Blueprint("healthcheck", __name__)

@blueprint.get("/")
def get():
    return Response(response=json.dumps({"message":"sucess!"}),
                    status=HTTPStatus.OK)