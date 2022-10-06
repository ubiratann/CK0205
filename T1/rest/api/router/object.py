import json

from http import HTTPStatus
from flask import Blueprint, Response, request
from flask_cors import CORS
from api.service.mysql_connector import DatabaseConnector
from api.utils.s3 import delete_file, create_local_temp_file, delete_local_temp_file, upload_file
from api.utils.dynamodb import put_item, purge_item


blueprint = Blueprint("object", __name__)

CORS(blueprint)
connector = DatabaseConnector()


@blueprint.route("/", methods=["POST"])
def create():

    cursor = connector.get_cursor()

    response = {}
    status = HTTPStatus.CREATED

    try:
        req = request.json

        file_path = create_local_temp_file(req["file"]["base64"], req["file"]["name"], req["owner"]) 
        file_url = upload_file(file_name=file_path, bucket="svp-objects")
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
    except Exception as err:
        response["data"] = {}
        response["message"] = str(err)
        status = HTTPStatus.INTERNAL_SERVER_ERROR

    finally:
        cursor.close()

    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")

@blueprint.put("/<int:object_id>")
def update(object_id):
    cursor = connector.get_cursor()
    req = request.json

    response = {}
    status = HTTPStatus.OK
    
    try:
        print(req)
        if("base64" in req["file"]):
            file_path = create_local_temp_file(req["file"]["base64"], req["file"]["name"], req["owner"]) 
            file_url = upload_file(file_name=file_path, bucket="svp-objects")
            delete_local_temp_file(file_path=file_path)

            query = f"""
                    SELECT 
                        f.id as id,
                        f.s3_link as link,
                        f.name as name
                    FROM objects o
                    INNER JOIN files f ON f.id = o.file
                    WHERE o.id = {object_id};
            """

            cursor.execute(operation=query)
            old_file = cursor.fetchone()
            delete_file("svp-objects", f"{req['owner']}/{old_file['name']}")

            query = f"""
                    UPDATE files
                    SET 
                        s3_link = '{file_url}',
                        name = '{req["file"]["name"]}'
                    WHERE id = {old_file["id"]};
            """

            cursor.execute(operation=query)

            purge_item(object=object_id)

        query = f"""
                    UPDATE objects o
                    SET
                        o.name = '{req["name"]}',
                        o.location = '{req["location"]}'
                    WHERE o.id = {object_id};
                    """
        cursor.execute(operation=query)

    except Exception as err:
        response["data"] = {}
        response["message"] = str(err)
        status = HTTPStatus.INTERNAL_SERVER_ERROR

    finally:
        cursor.close()

    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")

@blueprint.delete("/")
def delete():
    ...


@blueprint.get("/")
def getAll():
    cursor = connector.get_cursor()
   
    response = {}
    status = HTTPStatus.OK

    try:
        query = f"""
                    SELECT 
                        o.name,
                        o.id,
                        o.location,
                        f.name as file_name,
                        f.id as file_id,
                        f.s3_link
                    FROM objects o
                    INNER JOIN files f on f.id = o.file;
                """
        
        cursor.execute(operation=query)
        rows = cursor.fetchall()
        if(rows):
            response["data"] = rows
        else:
            raise Exception(f"Nenhum arquivo com o código {id} foi encontrado")

    except Exception as err:
        response["data"] = {}
        response["message"] = str(err)
        status = HTTPStatus.INTERNAL_SERVER_ERROR

    finally:
        cursor.close()
    
    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")


@blueprint.get("/<int:id>")
def get(id):
    cursor = connector.get_cursor()
   
    response = {}
    status = HTTPStatus.OK

    try:
        query = f"""
                    SELECT                         
                        o.name,
                        o.id,
                        o.location,
                        f.name as file_name,
                        f.id as file_id,
                        f.s3_link
                    FROM objects o
                    INNER JOIN files f on f.id = o.file
                    WHERE o.id = {id};
                    """
        
        cursor.execute(operation=query)
        row = cursor.fetchone()

        if(row):
            response["data"] = [row]
        else:
            raise Exception(f"Nenhum arquivo com o código {id} foi encontrado")

    except Exception as err:
        response["data"] = {}
        response["message"] = str(err)
        status = HTTPStatus.INTERNAL_SERVER_ERROR

    finally:
        cursor.close()
    
    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")


@blueprint.post("/validate")
def validate():
    response = {}
    status = HTTPStatus.CREATED

    try:
        req = request.json
        put_item(req)

    except Exception as err:
        response["data"] = {}
        response["message"] = str(err)
        status = HTTPStatus.INTERNAL_SERVER_ERROR

    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")

@blueprint.delete("/dynamofiles")
def test():
    req = request.json
    response = {}
    status = HTTPStatus.CREATED

    try:
        req = request.json
        purge_item(req["id"])

    except Exception as err:
        response["data"] = {}
        response["message"] = str(err)
        status = HTTPStatus.INTERNAL_SERVER_ERROR

    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")
