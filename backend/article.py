from flask import Blueprint, request, make_response, jsonify
from config import *
from helper import authenticated, get_unix_time
import sqlite3
import json

article_page = Blueprint("article", __name__)

# add the first title page, no image involved
@article_page.route('/article/title', methods=['POST'])
@authenticated
def article_title_create():
    data = request.get_json()

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

    if not title or not content:
        return make_response(jsonify({"error": "missing title or content"})), 400

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    cur.execute("insert into articles values (?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)",
                [id, article_id, step_number, title, content, image, time_created, time_modified, author, reploy_ids, thumbUpBy, is_deleted])
    id = cur.lastrowid
    con.commit()

    return make_response(jsonify({"article_id": id})), 200

# add the title page, currently has not set up image
@article_page.route('/article/page', methods=['POST'])
@authenticated
def article_page_create():
    data = request.get_json()

    id = None
    article_id = data.get('article_id', None)
    step_number = data.get('step_number', None)
    title = None
    content = data.get('content', None)
    image = None
    time_created = get_unix_time()
    time_modified = get_unix_time()
    author = request.headers['user_id']
    reploy_ids = json.dumps(list())
    thumbUpBy = json.dumps(list())
    is_deleted = 0

    if not article_id or not step_number or not content:
        return make_response(jsonify({"error": "missing article_id, step_number or content"})), 400

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
