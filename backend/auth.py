from flask import request
import requests
from flask import Flask
from flask_restx import Resource, Api
# from datetime import datetime, timedelta
# import re
import sqlite3
# import json
import uuid

DATABASE_NAME = "FightingTiger.db"


con = sqlite3.connect(DATABASE_NAME)
cur = con.cursor()

cur.execute(
    "CREATE TABLE IF NOT EXISTS users (id integer primary key autoincrement, name text, email text, password text, token text)")

app = Flask(__name__)
api = Api(app)


@api.route('/auth/register')
class AuthRegister(Resource):
    def post(self):
        data = request.get_json()
        name = data['name']
        email = data['email']
        password = data['password']

        con = sqlite3.connect(DATABASE_NAME)
        cur = con.cursor()

        # check if the email address has been used
        sql = "SELECT id from users where email = '{}'".format(email)
        print(sql)
        rows = cur.execute(sql).fetchall()
        if len(rows) > 0:
            return "This email has been registed, please login", 400

        # generate token, currently is just uuid
        # uuid4 is a random UUID
        token = str(uuid.uuid4())

        # passed all the check, insert into database
        cur.execute("insert into users values (?, ?, ?, ?, ?)",
                    [None, name, email, password, token])
        con.commit()

        return token, 200


@api.route('/ping')
class AuthRegister(Resource):
    def get(self):
        return "Pong", 200


if __name__ == '__main__':

    app.run(debug=True)
