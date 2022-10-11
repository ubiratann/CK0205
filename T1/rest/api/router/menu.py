from ast import Raise
import json

from http import HTTPStatus
from flask import Blueprint, Response
from flask_cors import CORS
from api.service.mysql_connector import DatabaseConnector
from api.utils.dynamodb import get_item


blueprint = Blueprint("menu", __name__)

CORS(blueprint)
connector = DatabaseConnector()

@blueprint.get("/<int:access_level>")
def get(access_level):
    cursor = connector.get_cursor()

    response = {}
    status = HTTPStatus.OK

    try:
        response["data"] = get_item(access_level)
        
    except Exception as err:
        response["data"] = {}
        response["message"] = str(err)
        status = HTTPStatus.INTERNAL_SERVER_ERROR

    finally:
        cursor.close()

    return Response(response=json.dumps(response),
                status=status,
                content_type="text/json; encoding: UTF-8")