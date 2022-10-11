from dis import findlinestarts
import json
import logging

from http import HTTPStatus
from shutil import ExecError
from flask import Blueprint, Response, request, session
from werkzeug.security import check_password_hash, generate_password_hash
from api.service.mysql_connector import DatabaseConnector
from api.utils.dynamodb import parse_decimal, query_resume
from flask_cors import CORS

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

@blueprint.patch("/<int:id>")
def update(id):
    req = request.json
    db = conn.get_cursor()

    try:
        db.execute("SELECT id FROM users WHERE id=%s", (id,))
        user = db.fetchone()

        if user is not None:
            db.execute("SELECT * FROM users WHERE username = %s", (req['username'],))
            user = db.fetchone()

            if user is None or (user is not None and user['username'].lower() == req['username'].lower() and user['id'] == id):
                db.execute(
                    "UPDATE users SET full_name=%s, username=%s, password=%s WHERE id=%s",
                    (
                        req['full_name'],
                        req['username'],
                        generate_password_hash(req['password']),
                        id,
                    )
                )
                msg = "Alterado com sucesso"
                code = HTTPStatus.OK
            else:
                msg = "Username já existe"
                code = HTTPStatus.NOT_ACCEPTABLE
            
        else:
            msg = "Usuario não encontrado"
            code = HTTPStatus.NOT_FOUND

        db.close() 
    except Exception as err:
        logging.error(err)
        msg = err
        code = HTTPStatus.INTERNAL_SERVER_ERROR

    return Response(msg, status=code)


@blueprint.delete('/delete/<int:id>')
def delete(id):
    db = conn.get_cursor()

    try:
        db.execute("SELECT id FROM users WHERE id=%s", (id,))
        user = db.fetchone()

        if user is not None:
            db.execute("DELETE FROM users WHERE id=%s", (id,))
            msg = "Deletado com sucesso"
            code = HTTPStatus.OK
        else:
            msg = 'Id incorreto'
            code = HTTPStatus.NOT_FOUND

        db.close()
    except Exception as err:
        logging.error(err)
        msg = err
        code = HTTPStatus.INTERNAL_SERVER_ERROR

    return Response(msg, status=code)


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

