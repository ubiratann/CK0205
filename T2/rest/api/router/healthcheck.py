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
    status = None
    response = None
    try:
        connector = DatabaseConnector()
        status = HTTPStatus.OK
        response = json.dumps({"message":"sucess!"})
    except Exception as err:
        status = HTTPStatus.INTERNAL_SERVER_ERROR
        response = err

    return Response(response=response,
                    status=status)