from flask import Blueprint, request, make_response, jsonify
from config import *
from helper import authenticated, get_unix_time, get_user_id_from_header
import sqlite3
import json
from flask_cors import CORS

question_page = Blueprint("question", __name__)
CORS(question_page)


# allow user to post a question to ask
@question_page.route('/questions/add', methods=['POST'])
@authenticated
def question_create():
    data = request.get_json()
    print(data)

    title = data.get("title", None)
    print("title",title)
    if not question_page:
        return make_response(jsonify({"error": "missing title or content"})), 400
    question_id = _question_title_create(data)
    # for i in range(1, len(data)):
    #     content = data.get(str(i), None)
    #     _question_page_create(data, question_id, i)
    return make_response(jsonify({"question_id": question_id})), 200

# [id, question_id, step_number, step_title, title, content, image, time_created, time_modified, author, reploy_ids, thumb_up_by, is_deleted])
# sqlite3.OperationalError: table questions has 9 columns but 13 values were supplied
def _question_title_create(data):

    id = None
    # question_id = None
    # step_number = 0
    # step_title = data.get('step_title', None)
    title = data.get('title', None)
    content = data.get('content', None)
    # image = None
    time_created = get_unix_time()
    time_modified = get_unix_time()
    author = get_user_id_from_header()
    reploy_ids = json.dumps(list())
    thumb_up_by = json.dumps(list())
    is_deleted = 0

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    cur.execute("insert into questions values (?, ?, ?, ?, ?, ?, ?, ?, ? )",
                [id, title, content, time_created, time_modified, author, reploy_ids, thumb_up_by, is_deleted])
    id = cur.lastrowid
    con.commit()
    update_score(author)
    return id

def update_score(user_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    ret = dict()

    sql = "SELECT scores from users where id = {} or token == '{}'".format(user_id,user_id)

    rows = cur.execute(sql).fetchall()
    score = int(rows[0][0])
    score+=1
    sql = "UPDATE users SET scores = {} where id = {} or token = '{}'".format(
         score,user_id,user_id)
    cur.execute(sql)
    con.commit()

def get_user_id_by_question(question_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = "SELECT author from questions where id = {} ".format(question_id)
    rows = cur.execute(sql).fetchall()
    user_id = rows[0][0]
    return user_id

# delete all the title and pages information
@question_page.route('/questions/<int:question_id>', methods=['DELETE'])
@authenticated
def question_delete_by_id(question_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "UPDATE questions SET isDeleted = '1' where id = '{}'".format(
        question_id)

    cur.execute(sql)
    con.commit()

    return make_response(jsonify({"question_id": question_id})), 200


@question_page.route('/questions/<int:question_id>', methods=['GET'])
def question_get_by_id(question_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    ret = dict()
    sql = "SELECT * from questions where id = '{}' and isDeleted != '1'".format(question_id)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "Question not found with question_id = {}".format(question_id)})), 400
    ret['question'] = rows[0]
    return make_response(jsonify(ret)), 200


# allow user to like a question.
@question_page.route('/questions/<int:question_id>/like', methods=['PATCH'])
@authenticated
def question_like_patch(question_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "SELECT * from questions where id = '{}' and isDeleted != '1'".format(
        question_id)

    rows = cur.execute(sql).fetchall()
    print(rows)
    if len(rows) == 0:
        return make_response(jsonify({"error": "No such article with question_id = {}".format(question_id)})), 400

    user_id = get_user_id_from_header()

    thumb_up_by = json.loads(rows[0][7])

    if user_id not in thumb_up_by:
        thumb_up_by.append(user_id)

    thumb_up_by_string = json.dumps(thumb_up_by)

    sql = "UPDATE questions SET thumbUpBy = '{}' where id = '{}' and isDeleted != '1';".format(
        thumb_up_by_string, question_id)

    cur.execute(sql)
    con.commit()
    liked_user_id = get_user_id_by_question(question_id)
    update_score(liked_user_id)
    return question_get_by_id(question_id)


# allow user to dislike a question
@question_page.route('/questions/<int:question_id>/dislike', methods=['PATCH'])
@authenticated
def question_dislike_patch(question_id):

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "SELECT * from questions where id = '{}' and isDeleted != '1'".format(
        question_id)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "No such article with question_id = {}".format(question_id)})), 400

    user_id = get_user_id_from_header()

    thumb_up_by = json.loads(rows[0][7])

    if user_id in thumb_up_by:
        thumb_up_by.remove(user_id)

    thumb_up_by_string = json.dumps(thumb_up_by)

    sql = "UPDATE questions SET thumbUpBy = '{}' where id = '{}' and isDeleted != '1';".format(
        thumb_up_by_string, question_id)

    cur.execute(sql)
    con.commit()

    return question_get_by_id(question_id)

    
@question_page.route('/question/ping', methods=['GET'])
def question_ping():
    return "Pong", 200
