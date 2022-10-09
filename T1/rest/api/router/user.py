import json
import logging

from http import HTTPStatus
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
    password = req['password']
    msg = None

    try:
        db.execute("SELECT * FROM users WHERE username = %s", (req['username'],))
        user = db.fetchone()

        if user is None:
            msg = 'Username incorreto'
        elif not check_password_hash(user['password'], password):
            msg = 'Senha incorreta'

        if msg is None:
            session.clear()
            session['user_id'] = user['id']

            msg = "Autenticado com sucesso"
            code = HTTPStatus.OK
        else:
            code = HTTPStatus.UNAUTHORIZED

        db.close()
    except Exception as err:
        logging.error(err)
        msg = err
        code = HTTPStatus.INTERNAL_SERVER_ERROR

    return Response(msg, status=code)

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


@blueprint.post("/register")
def register():
    req = request.json
    db = conn.get_cursor()

    try:
        db.execute("SELECT id FROM users WHERE username=%s", (req['username'],))
        user = db.fetchone()

        if user is None:
            db.execute(
                "INSERT INTO users (full_name, username, password, role) VALUES (%s, %s, %s, %s)", 
                (
                    req['full_name'],
                    req['username'].lower(),
                    generate_password_hash(req['password']),
                    req['role'],
                )
            )
            msg = "Registrado com sucesso"
            code = HTTPStatus.OK
        else:
            msg = "Usuario já existe"
            code = HTTPStatus.BAD_REQUEST

        db.close()
    except Exception as err:
        logging.error(err)
        msg = err
        code = HTTPStatus.INTERNAL_SERVER_ERROR

    return Response(msg, status=code)
