from flask import Blueprint, request, make_response, jsonify
from config import *
from helper import authenticated, get_unix_time, get_user_id_from_header
import sqlite3
import json
from flask_cors import CORS

question_page = Blueprint("question", __name__)
CORS(question_page)


# allow user to post a question to ask
@question_page.route('/question/add', methods=['POST'])
@authenticated
def question_create():
    data = request.get_json()
    title = data.get("title", None)
    if not question_page:
        return make_response(jsonify({"error": "missing title or content"})), 400
    question_id = _question_title_create(title)
    for i in range(1, len(data)):
        content = data.get(str(i), None)
        _question_page_create(content, question_id, i)
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
    id = cur.lastrowid
    con.commit()

    return id



# to get all question_id, this function only ask question
@question_page.route('/question/get', methods=['GET'])
def question_get_by_id(question_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    ret = dict()
    sql = "SELECT * from questions where id = '{}' and isDeleted = != '1'".format(question_id)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "Question not found with question_id = {}".format(question_id)})), 400
    ret['question'] = rows[0]
    sql = "SELECT * from answers where question_id = '{}' and isDeleted = != '1'".format(question_id)
    rows = cur.execute(sql).fetchall()
    for row in rows:
        ret[row[2]] = _read_question_row(row)
    return make_response(jsonify(ret)), 200


# allow user to like a question.
@question_page.route('/question/like', methods=['PATCH'])
@authenticated
def question_like_patch(question_id):
    data = request.get_json()
    user_id = get_user_id_from_header()
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = "SELECT thumb_up_by from questions where id = '{}'".format(question_id)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "Question not found with question_id = {}".format(question_id)})), 400
    thumb_up_by = json.loads(rows[0][0])
    if user_id in thumb_up_by:
        return make_response(jsonify({"error": "You have already liked this question"})), 400
    thumb_up_by.append(user_id)
    sql = "UPDATE questions SET thumb_up_by = '{}' where id = '{}'".format(json.dumps(thumb_up_by), question_id)
    cur.execute(sql)
    con.commit()
    return make_response(jsonify({"success": "You have liked this question"})), 200  

# allow user to dislike a question
@question_page.route('/question/dislike', methods=['PATCH'])
@authenticated
def question_dislike_patch(question_id):
    data = request.get_json()
    user_id = get_user_id_from_header()
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = "SELECT thumb_up_by from questions where id = '{}'".format(question_id)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "Question not found with question_id = {}".format(question_id)})), 400
    thumb_up_by = json.loads(rows[0][0])
    if user_id not in thumb_up_by:
        return make_response(jsonify({"error": "You have already disliked this question"})), 400
    thumb_up_by.remove(user_id)
    sql = "UPDATE questions SET thumb_up_by = '{}' where id = '{}'".format(json.dumps(thumb_up_by), question_id)
    cur.execute(sql)
    con.commit()
    return make_response(jsonify({"success": "You have disliked this question"})), 200

    
@question_page.route('/question/ping', methods=['GET'])
def question_ping():
    return "Pong", 200
