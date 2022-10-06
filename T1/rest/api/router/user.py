
import logging
from http import HTTPStatus
from flask import Blueprint, Response, request, flash, g, redirect, render_template, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash

from api.service.mysql_connector import DatabaseConnector

blueprint = Blueprint("user", __name__)
conn = DatabaseConnector()

@blueprint.post("/auth")
def auth():
    req = request.json
    db = conn.get_cursor()
    password = req['password']

    try:
        user = db.execute(
            f"SELECT * FROM user WHERE username = '{req['username']}'"
        ).fetchone()

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

    except Exception as err:
        logging.error(err)
        msg = err
        code = HTTPStatus.INTERNAL_SERVER_ERROR
    finally:
        db.close() 
        conn.close_connection()

    return Response(response={"message": msg}, status=code)

@blueprint.patch("/")
def update():
    req = request.json
    db = conn.get_cursor()

    fullname = req['full_name']
    username = req['username']
    password = req['password']
    try:
        _hashed_password = generate_password_hash(password)
        db.execute(f"UPDATE users SET full_name='{fullname}', username='{username}', password='{_hashed_password}'")
        conn.commit_changes()

        msg = "Deletado com sucesso"
        code = HTTPStatus.NO_CONTENT
    except Exception as err:
        logging.error(err)
        msg = err
        code = HTTPStatus.INTERNAL_SERVER_ERROR
    finally:
        db.close() 
        conn.close_connection()

    return Response(response={"message": msg}, status=code)


@blueprint.delete('/delete/<int:id>')
def delete(id):
    db = conn.get_cursor()

    try:
        db.execute("DELETE FROM users WHERE id=%s", (id,))
        conn.commit_changes()

        msg = "Deletado com sucesso"
        code = HTTPStatus.NO_CONTENT
    except Exception as err:
        logging.error(err)
        msg = err
        code = HTTPStatus.INTERNAL_SERVER_ERROR
    finally:
        db.close()
        conn.close_connection()

    return Response(response={"message": msg}, status=code)


@blueprint.post("/register")
def register():
    req = request.json
    db = conn.get_cursor()

    try:
        db.execute(f"""
            INSERT INTO users (full_name, username, password, role) VALUES (
                "{req['full_name']}",
                "{req['username']}",
                "{generate_password_hash(req['password'])}",
                {req['role']}
            );
        """)
        conn.commit_changes()

        msg = "Registrado com sucesso"
        code = HTTPStatus.CREATED
    except Exception as err:
        logging.error(err)
        msg = err
        code = HTTPStatus.INTERNAL_SERVER_ERROR
    finally:
        db.close()
        conn.close_connection()

    return Response(response={"message": msg}, status=code)


@blueprint.post("/logout")
def logout():
    session.clear()
