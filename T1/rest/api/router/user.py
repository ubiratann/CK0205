import json

from http import HTTPStatus
from flask import Blueprint, Response, request, session
from werkzeug.security import check_password_hash, generate_password_hash
from api.service.mysql_connector import DatabaseConnector
from flask_cors import CORS
from api.utils.s3 import delete_file
from api.utils.dynamodb import purge_item

blueprint = Blueprint("user", __name__)
conn = DatabaseConnector()

CORS(blueprint)

@blueprint.post("/signout")
def signout():
    session.clear()
    return Response("Sessão finalizada com sucesso", status=HTTPStatus.OK)

@blueprint.post("/auth")
def auth():
    req = request.json
    db = conn.get_cursor()

    response = {}
    status = HTTPStatus.OK

    try:
        
        db.execute("SELECT * FROM users WHERE username LIKE %s", (req['username'],))
        user = db.fetchone()
        if (not user or  not check_password_hash(user['password'], req['password'])):
            status = HTTPStatus.UNAUTHORIZED
            raise Exception("Credenciais inválidas")
        else:
            del user["password"]
            response["data"] = user
            status = HTTPStatus.OK
    
    except Exception as err:
        response["data"] = {}
        response["message"] = str(err)
    
    finally:
        db.close()
    print(response)
    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")

@blueprint.patch("/")
def update():
    req = request.json
    db = conn.get_cursor()

    response = {}
    status = HTTPStatus.OK

    try:
        db.execute("SELECT * FROM users WHERE username LIKE %s", (req['username'],))
        user = db.fetchone()
        if (not user):
            query = f"""
                UPDATE
                    users 
                SET
                    full_name= '{req["full_name"]}', 
                    username= '{req["username"]}', 
                    email= '{req["email"]}', 
                    password= '{generate_password_hash(req["password"])}')
                WHERE
                    username like '{req["username"]}';
                """

            print(query)
            db.execute(operation=query)

            response["data"] = req
            response["data"]["id"] = db.lastrowid

            response["message"] = "Registrado com sucesso!"
            status = HTTPStatus.OK

        else:
            status = HTTPStatus.UNAUTHORIZED
            raise Exception("Este nome de usuário já está em uso");

    except Exception as err:
        print(err)
        response["data"] = {}
        response["message"] = str(err)
    
    finally:
        db.close()

    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")



@blueprint.delete('/<int:id>')
def delete(id):
    db = conn.get_cursor()
    response = {}
    code = HTTPStatus.OK

    try:
        query = f"""
            SELECT 
                *
            FROM
                objects o
            WHERE
                 o.owner = {id};
            
        """

        db.execute(operation=query)
        objects= db.fetchall()

        if(objects and len(objects)>0 ):
            for obj in objects:
                query = f"""
                    SELECT * FROM objects WHERE id = {obj['file']};
                """

                db.execute(query)
                files = db.fetchall()
            
                query = f""" DELETE FROM objects where id = {obj['id']};"""
                db.execute(query)

                for file in files:
                    delete_file("svp-objects", f"{id}/{file['name']}")  #deletando arquivos do s3
                    query = f""" DELETE FROM files WHERE id = {file['id']};"""
                    db.execute(query)

                purge_item(obj["id"])

        query = f"""
            DELETE FROM users WHERE id = {id};
        """
        db.execute(query)
        db.fetchall()
      
        response["data"] = {}
        response["message"] = f"O usuário com id = {id} foi removido!"

    except Exception as err:
        response["message"] = str(err)
        code = HTTPStatus.INTERNAL_SERVER_ERROR

    return Response(json.dumps(response), 
                    status=code,
                    content_type="text/json; encoding: UTF-8")



@blueprint.post("/signin")
def register():
    req = request.json
    db = conn.get_cursor()

    response = {}
    status = HTTPStatus.OK

    try:
        db.execute("SELECT * FROM users WHERE username LIKE %s", (req['username'],))
        user = db.fetchone()
        if (not user):
            query = f"""
                INSERT 
                INTO 
                    users(full_name, username, email, password, role)
                VALUES (
                    '{req["full_name"]}',
                    '{req["username"]}',
                    '{req["email"]}',
                    '{generate_password_hash(req["password"])}',
                    (SELECT id FROM roles WHERE name LIKE 'regular'));
                """

            print(query)
            db.execute(operation=query)

            response["data"] = req
            response["data"]["id"] = db.lastrowid

            response["message"] = "Registrado com sucesso!"
            status = HTTPStatus.OK

        else:
            status = HTTPStatus.UNAUTHORIZED
            raise Exception("Este nome de usuário já está em uso");

    except Exception as err:
        print(err)
        response["data"] = {}
        response["message"] = str(err)
    
    finally:
        db.close()

    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")

@blueprint.get("/<int:id>")
def getOne(id):
    cursor = conn.get_cursor()

    response = {}
    status = HTTPStatus.OK

    try:

        query = f"""
            SELECT * FROM users WHERE id={id};
        """

        cursor.execute(operation=query)
        users = cursor.fetchall()

        print(users)
        if(not users or len(users) == 0):
            status = HTTPStatus.NOT_FOUND
            raise Exception("Não foram encontrados usuários")

        response["data"] = users

    except Exception as err:
        print(err)
        response["data"] = {}
        response["message"] = str(err)

    finally:
        cursor.close()

    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")

@blueprint.get("/")
def getMany():
    cursor = conn.get_cursor()

    response = {}
    status = HTTPStatus.OK

    try:
        query = f"""
            SELECT * FROM users;
        """

        cursor.execute(operation=query)
        users = cursor.fetchall()

        if(not users or len(users) == 0):
            status = HTTPStatus.NOT_FOUND
            raise Exception("Não foram encontrados usuários")
        else:
            response["data"] = users
            response["message"] = "Busca concluída com sucesso"

    except Exception as err:
        response["data"] = {}
        response["message"] = str(err)
    finally:
        cursor.close()

    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")

@blueprint.put("/role/<int:role>")
def updateRole(role):
    cursor = conn.get_cursor()
    req = request.json

    response = {}
    status = HTTPStatus.OK

    try:
        query = f"""
            UPDATE 
                users
            SET
                role = {role}
            WHERE
                id = {req["id"]};
        """

        cursor.execute(operation=query)
        response["data"] = {}
        response["message"] = "Nível de acesso atualizado com sucesso!"

    except Exception as err:
        response["data"] = {}
        response["message"] = str(err)

    finally:
        cursor.close()

    return Response(response=json.dumps(response),
                    status=status,
                    content_type="text/json; encoding: UTF-8")