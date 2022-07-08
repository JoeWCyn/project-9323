from flask import Blueprint, request, make_response, jsonify
from config import *
from helper import authenticated, get_unix_time, get_user_id_from_header
import sqlite3
import json
from flask_cors import CORS

question_page = Blueprint("question", __name__)
CORS(question_page)

# allow user to post a question to ask
@question_page.route('/question', methods=['POST'])
@authenticated
def question_create():
    data = request.get_json()
    title_page = data.get("0", None)
    if not title_page:
        return make_response(jsonify({"error": "missing title or content"})), 400
    question_id = _question_title_create(title_page)

    for i in range(1, len(data)):
        content_page = data.get(str(i), None)
        _question_page_create(content_page, question_id, i)

    return make_response(jsonify({"question_id": question_id})), 200


def _question_title_create(data):
    id = None
    question_id = None
    step_number = 0
    step_title = data.get('step_title', None)
    title = data.get('title', None)
    content = data.get('content', None)
    image = None
    time_created = get_unix_time()
    time_modified = get_unix_time()
    author = get_user_id_from_header()
    reploy_ids = json.dumps(list())
    thumb_up_by = json.dumps(list())
    is_deleted = 0

    #content = 'aaa'
    #userId = 2

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    cur.execute("insert into questions values (?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?)",
                [id, question_id, step_number, step_title, title, content, image, time_created, time_modified, author, reploy_ids, thumb_up_by, is_deleted])
    id = cur.lastrowid
    con.commit()

    return id


def _question_page_create(data, question_id, step_number):

    id = None
    question_id = question_id
    step_number = step_number
    step_title = data.get('step_title', None)
    title = None
    content = data.get('content', None)
    image = None
    time_created = get_unix_time()
    time_modified = get_unix_time()
    author = get_user_id_from_header()
    reploy_ids = json.dumps(list())
    thumb_up_by = json.dumps(list())
    is_deleted = 0

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    cur.execute("insert into questions values (?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?)",
                [id, question_id, step_number, step_title, title, content, image, time_created, time_modified, author, reploy_ids, thumb_up_by, is_deleted])
    #id = cur.lastrowid
    con.commit()

    return make_response(jsonify({"question_id": question_id})), 200
    #return id



# to get all question_id, this function only ask question
@question_page.route('/question/<int:question_id>', methods=['GET'])
@authenticated
def question_get(question_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    ret = dict()
    sql = "SELECT * from questions where id = '{}' and isDeleted != '1'".format(
        question_id)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "Question not found with question_id = {}".format(question_id)})), 400
    ret[0] = _read_question_row(rows[0])
    sql = "SELECT * from questions where question_id = '{}' and isDeleted != '1'".format(
        question_id)
    rows = cur.execute(sql).fetchall()

    for row in rows:
        ret[row[2]] = _read_question_row(row)
    
    return make_response(jsonify({"question": ret})), 200

    #return make_response(jsonify(ret)), 200


# allow user to like a question.
@question_page.route('/question/<int:article_id>/thumb_up', methods=['PATCH'])
@authenticated
def question_thumb_up_patch(question_id):
    #data = request.get_json()
    #user_id = get_user_id_from_header()
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = "SELECT thumb_up_by from questions where id = '{}' and isDeleted != '1'".format(
        question_id)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "Question not found with question_id = {}".format(question_id)})), 400
    user_id = get_user_id_from_header()
    thumb_up_by = json.loads(rows[0][11])
    if user_id not in thumb_up_by:
        thumb_up_by.append(user_id)

    thumb_up_by_string = json.dumps(thumb_up_by)

    sql = "UPDATE questions SET thumb_up_by = '{}' where id = '{}' and isDeleted != '1';".format(
        thumb_up_by_string, question_id)
    cur.execute(sql)
    con.commit()

    return question_get_by_id(question_id)


# allow user to dislike a question
@question_page.route('/question/<int:question_id>/un_thumb_up', methods=['PATCH'])
@authenticated
def question_un_thumb_up_patch(question_id):
    #data = request.get_json()
    #user_id = get_user_id_from_header()
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = "SELECT thumb_up_by from questions where id = '{}' and isDeleted != '1'".format(
        question_id)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "Question not found with question_id = {}".format(question_id)})), 400
    user_id = get_user_id_from_header()
    thumb_up_by = json.loads(rows[0][11])
    if user_id in thumb_up_by:
        thumb_up_by.remove(user_id)
    thumb_up_by_string = json.dumps(thumb_up_by)
    sql = "UPDATE questions SET thumb_up_by = '{}' where id = '{}' and isDeleted != '1';".format(
        thumb_up_by_string, question_id)

    cur.execute(sql)
    con.commit()

    return question_get_by_id(question_id)



    
@question_page.route('/question/ping', methods=['GET'])
def question_ping():
    return "Pong", 200
