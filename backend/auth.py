from flask import request, Blueprint
import sqlite3
import uuid
from flask import jsonify, make_response
from config import *


auth_page = Blueprint("auth", __name__)


@auth_page.route('/auth/register', methods=['POST'])
def auth_register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    # check if the email address has been used
    sql = "SELECT id from users where email = '{}'".format(email)
    rows = cur.execute(sql).fetchall()
    if len(rows) > 0:
        return make_response(jsonify({"error": "This email has been registed, please login"})), 400

    # generate token, currently is just uuid
    # uuid4 is a random UUID
    token = str(uuid.uuid4())

    # passed all the check, insert into database
    cur.execute("insert into users values (?, ?, ?, ?, ?)",
                [None, name, email, password, token])
    con.commit()

    return make_response(jsonify({"token": token})), 200


@auth_page.route('/auth/login', methods=['POST'])
def auth_login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "SELECT token from users where email = '{}' and password = '{}'".format(
        email, password)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "Email and password don't match"})), 400

    token = rows[0][0]

    return make_response(jsonify({"token": token})), 200


@auth_page.route('/auth/logout', methods=['POST'])
def auth_logout():
    body = {}
    response = make_response(jsonify(body))
    return response


@auth_page.route('/auth/ping', methods=['GET'])
def auth_ping():
    return "Pong", 200
