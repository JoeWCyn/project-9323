from flask import Blueprint, request, make_response, jsonify
from config import *
from helper import authenticated, get_unix_time, get_user_id_from_header
import sqlite3
import json
from flask_cors import CORS
from flask import Flask
app = Flask(__name__)

score_page = Blueprint("score", __name__)
CORS(score_page)

@score_page.route('/become_expert',methods=['GET'])
@authenticated
def become_expert():
    user_id = get_user_id_from_header()

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    ret = dict()

    sql = "SELECT scores,expertOrNot from users where id = {} or token == '{}'".format(user_id,user_id)
    rows = cur.execute(sql).fetchall()
    score = int(rows[0][0])
    expertOrNot = rows[0][1]
    if expertOrNot=="1":
        return make_response(jsonify({"users": user_id,"expertOrNot":"1","msg":"already expert"})), 200
    if score>=20:
        score-=20
        expertOrNot = "1"
        sql = "UPDATE users SET scores = {},expertOrNot = '1' where id = {} or token = '{}'".format(
             score,user_id,user_id)
        cur.execute(sql)
        con.commit()
        return make_response(jsonify({"users": user_id,"expertOrNot":expertOrNot})), 200
    else:
        return make_response(jsonify({"users": user_id,"expertOrNot":"0","msg":"score not enough"})), 200


@score_page.route('/expert_require_not_public',methods=['GET'])
@authenticated
def expert_require_not_public():
    user_id = get_user_id_from_header()

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    ret = dict()

    sql = "SELECT scores,expertOrNot,isPpublic from users where id = {} or token == '{}'".format(user_id,user_id)
    rows = cur.execute(sql).fetchall()
    expertOrNot = rows[0][1]
    if expertOrNot=="1":

        sql = "UPDATE users SET isPpublic = '1' where id = {} or token = '{}'".format(user_id,user_id)
        cur.execute(sql)
        con.commit()

        return make_response(jsonify({"users": user_id,"isPpublic":"1"})), 200
    else:
        return make_response(jsonify({"users": user_id,"isPpublic":"0","msg":"not expert"})), 200


@score_page.route('/expert_require_public',methods=['GET'])
@authenticated
def expert_require_public():
    user_id = get_user_id_from_header()

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    ret = dict()

    sql = "SELECT scores,expertOrNot,isPpublic from users where id = {} or token == '{}'".format(user_id,user_id)
    rows = cur.execute(sql).fetchall()
    expertOrNot = rows[0][1]
    if expertOrNot=="1":
        sql = "UPDATE users SET isPpublic = '0' where id = {} or token = '{}'".format(user_id,user_id)
        cur.execute(sql)
        con.commit()
        return make_response(jsonify({"users": user_id,"isPpublic":"0"})), 200
    else:
        return make_response(jsonify({"users": users,"isPpublic":"0","msg":"not expert,default public"})), 200
