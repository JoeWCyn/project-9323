from flask import Blueprint, request, make_response, jsonify
from config import *
from helper import authenticated, get_unix_time
import sqlite3
import json
from flask_cors import CORS

article_page = Blueprint("article", __name__)
CORS(article_page)


@article_page.route('/article', methods=['POST'])
@authenticated
def article_create():
    data = request.get_json()
    title_page = data.get("0", None)
    if not title_page:
        return make_response(jsonify({"error": "missing title or content"})), 400
    article_id = _article_title_create(title_page)

    for i in range(1, len(data)):
        content_page = data.get(str(i), None)
        _article_page_create(content_page, article_id, i)

    return make_response(jsonify({"article_id": article_id})), 200


def _article_title_create(data):
    id = None
    article_id = None
    step_number = 0
    title = data.get('title', None)
    content = data.get('content', None)
    image = None
    time_created = get_unix_time()
    time_modified = get_unix_time()
    author = request.headers['user_id']
    reploy_ids = json.dumps(list())
    thumbUpBy = json.dumps(list())
    is_deleted = 0

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    cur.execute("insert into articles values (?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)",
                [id, article_id, step_number, title, content, image, time_created, time_modified, author, reploy_ids, thumbUpBy, is_deleted])
    id = cur.lastrowid
    con.commit()

    return id


def _article_page_create(data, article_id, step_number):

    id = None
    article_id = article_id
    step_number = step_number
    title = None
    content = data.get('content', None)
    image = None
    time_created = get_unix_time()
    time_modified = get_unix_time()
    author = request.headers['user_id']
    reploy_ids = json.dumps(list())
    thumbUpBy = json.dumps(list())
    is_deleted = 0

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    cur.execute("insert into articles values (?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)",
                [id, article_id, step_number, title, content, image, time_created, time_modified, author, reploy_ids, thumbUpBy, is_deleted])
    con.commit()

    return make_response(jsonify({"article_id": article_id})), 200


# get all the title and pages information
@article_page.route('/article/<int:article_id>', methods=['GET'])
@authenticated
def article_get_by_id(article_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    ret = dict()
    sql = "SELECT * from articles where id = '{}' and isDeleted != '1'".format(
        article_id)
    rows = cur.execute(sql).fetchall()
    ret[0] = _read_artical_row(rows[0])

    sql = "SELECT * from articles where articleId = '{}' and isDeleted != '1'".format(
        article_id)
    rows = cur.execute(sql).fetchall()

    for row in rows:
        ret[row[2]] = _read_artical_row(row)

    return make_response(jsonify({"article": ret})), 200


def _read_artical_row(row):
    ret = {
        "id": row[0],
        "article_id": row[1],
        "step_number": row[2],
        "title": row[3],
        "content": row[4],
        "image": row[5],
        "time_created": row[6],
        "time_modified": row[7],
        "author": row[8],
        "reploy_ids": row[9],
        "thumbUpBy": row[10],
        "is_deleted": row[11],
    }
    return ret


@article_page.route('/article/ping', methods=['GET'])
def article_ping():
    return "Pong", 200
