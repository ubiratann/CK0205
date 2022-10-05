from crypt import methods
from dis import findlinestarts
from http import HTTPStatus
from flask import Blueprint, Response, request
from flask_cors import CORS
from api.service.mysql_connector import DatabaseConnector
from api.utils.s3 import create_bucket, create_local_temp_file, delete_local_temp_file, upload_file

import os
import json
import boto3

blueprint = Blueprint("object", __name__)

CORS(blueprint)
connector = DatabaseConnector()


@blueprint.route("/", methods=["POST"])
def create():

    cursor = connector.get_cursor()
    try:
        req = request.json

        file_path = create_local_temp_file(req["file"]["base64"], req["file"]["name"], req["owner"]) 
        file_url = upload_file(file_name=file_path, bucket="svp-objects", object_name=req["file"]["name"])
        delete_local_temp_file(file_path=file_path)
        

        cursor.execute(operation=f"""INSERT INTO  files(name, s3_link) values(
                                    "{req['file']['name']}",
                                    "{file_url}" 
                                    );
        """)
        
        file_id = cursor.lastrowid

        cursor.execute(operation=f"""INSERT INTO objects(name, location, owner, file) values(
                                        "{req['name']}",
                                        "{req['location']}",
                                        {req['owner']},
                                        {file_id}
                                    );
                                """)
        object_id = cursor.lastrowid
        
        data = {
            "id": object_id,
            "object": req["name"],
            "file": {
                "id": file_id,
                "link": file_url
            },
            "message": "Arquivo criado com sucesso!"
        }
        return Response(response=json.dumps(data), status=HTTPStatus.CREATED)

    except Exception as err:
        print(err)
        return Response(status=HTTPStatus.INTERNAL_SERVER_ERROR)

    finally:
        cursor.close()


@blueprint.patch("/")
def udpate():
    ...

@blueprint.delete("/")
def delete():
    ...
