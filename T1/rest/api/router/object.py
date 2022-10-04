from crypt import methods
from http import HTTPStatus
import os
from flask import Blueprint, Response, request
from flask_cors import CORS
from api.service.mysql_connector import DatabaseConnector

import json
import boto3


ACESS_KEY_ID = os.environ.get("ACESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")

blueprint = Blueprint("object", __name__)

CORS(blueprint)

@blueprint.route("/", methods=["POST"])
def create():
 

    # return Response(response=json.dumps({'message':'sucess'}), status=HTTPStatus.CREATED)
    try:
        
        cursor = connection.get_cursor()
        cursor.execute(f"""
            INSERT INTO SVP.OBJECT (name, location, file, owner ) VALUES(
                {req.name},
                {req.location},
                {req.file.name},
                {req.owner}
            );
        """)

        res = cursor.fetchone()

        Response(response={"message": "Inserido com sucesso"},  status=HTTPStatus.CREATED )
    except Exception as err:
        print(err)

@blueprint.patch("/")
def udpate():
    ...

@blueprint.delete("/")
def delete():
    ...
