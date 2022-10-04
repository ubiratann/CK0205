from crypt import methods
from http import HTTPStatus
from flask import Blueprint, Response, request

from api.service.mysql_connector import DatabaseConnector

blueprint = Blueprint("object", __name__)

@blueprint.route("/", methods=["POST"])
def create():
    print("entrou")
    req = request.json
    connection = DatabaseConnector()

    try:
        cursor = connection.get_cursor()
        cursor.execute(f"""
            INSERT INTO SVP.OBJECT (name, location, file, owner ) VALUES(
                {req.name},
                {req.location},
                {req.file},
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
