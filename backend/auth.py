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
        
        uuid = uuid.uuid4()

        # passed all the check, insert into database
        cur.execute("insert into users values (?, ?, ?, ?, ?)", [None, name, email, password, uuid])
        con.commit()

        return uuid, 200


@api.route('/ping')
class AuthRegister(Resource):
    def get(self):
        return "Pong", 200

# def insert_in_sqlite(res):
#     lst_to_insert = []
#     for r in res:
#         person = r["person"]
#         user_id = person.get("id", "")
#         # if id is already in table, skip this insert
#         if id and check_id_exist(id):
#             continue
#         updated = person.get("updated", "")
#         if updated:
#             updated = convert_datetime(updated)
#         name = person.get("name", "")
#         country = person.get("country", "")
#         if country:
#             country = country.get("name", "")
#         birthday = person.get("birthday", "")
#         deathday = person.get("deathday", "")
#         gender = person.get("gender", "")
#         shows = get_shows_by_id(id)
#         lst_to_insert.append(
#             [id, updated, name, country, birthday, deathday, gender, shows])

#     con = sqlite3.connect(DATABASE_NAME)
#     cur = con.cursor()
#     cur.executemany(
#         "insert into actors values (?, ?, ?, ?, ?, ?, ?, ?)", lst_to_insert)
#     con.commit()


if __name__ == '__main__':

    app.run(debug=True)
