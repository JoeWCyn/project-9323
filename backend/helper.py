from functools import wraps
from flask import request, jsonify, make_response
from config import *
import sqlite3
import time


def authenticated(func):
    @wraps(func)
    def wrap(*args, **kwargs):
        if request.headers.has_key('token') and request.headers.has_key('user_id'):
            auth_token = request.headers['token']
            user_id = request.headers['user_id']

            id = get_user_id_from_token(auth_token)
            if not id or id != user_id:
                return make_response(
                    jsonify("Invalid access as token or user_id invalid.")
                )
        else:
            return make_response(
                jsonify("Invalid access, no token or user_id found.")
            )
        return func(*args, **kwargs)
    return wrap


def get_user_id_from_token(token):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "SELECT id from users where token = '{}'".format(token)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return None
    else:
        return str(rows[0][0])


def get_unix_time():
    return int(time.time())