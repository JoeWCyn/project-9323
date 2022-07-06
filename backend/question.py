from flask import Blueprint
from config import *

question_page = Blueprint("question", __name__)

@question_page.route('/question/ping', methods=['GET'])
def question_ping():
    return "Pong", 200

# allow user to post a question and word account not more than 200 words
@question_page.route('/question/add', methods=['POST'])
def question_add():
    data = request.get_json()
    user_id = data['user_id']
    question = data['question']
    answer = data['answer']
    if len(question) > 200:
        return make_response(jsonify({"error": "Question is too long"})), 400
    if len(answer) > 200:
        return make_response(jsonify({"error": "Answer is too long"})), 400
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = "insert into questions values (?, ?, ?, ?)"
    cur.execute(sql, [None, user_id, question, answer])
    con.commit()
    return make_response(jsonify({"success": "Question added"})), 200


# allow user to get all questions
@question_page.route('/question/get', methods=['GET'])
def question_get():
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = "SELECT * from questions"
    rows = cur.execute(sql).fetchall()
    return make_response(jsonify(rows)), 200

"""
# allow user to sort the questions by the number of answers
@question_page.route('/question/sort', methods=['GET'])
def question_sort():
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = "SELECT * from questions ORDER BY answers DESC"
    rows = cur.execute(sql).fetchall()
    return make_response(jsonify(rows)), 200
"""

# allow user to follow a question
@question_page.route('/question/follow', methods=['POST'])
def question_follow():
    data = request.get_json()
    user_id = data['user_id']
    question_id = data['question_id']
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    cur.execute("insert into follows values (?, ?, ?)",
                [None, user_id, question_id])
    con.commit()
    return make_response(jsonify({"success": "Question followed"})), 200

# allow user to like or dislike a question
@question_page.route('/question/like', methods=['POST'])
def question_like():
    data = request.get_json()
    user_id = data['user_id']
    question_id = data['question_id']
    like = data['like']
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    if like == "like":
        cur.execute("insert into likes values (?, ?, ?)",
                    [None, user_id, question_id])
    else:
        cur.execute("insert into dislikes values (?, ?, ?)",
                    [None, user_id, question_id])
    con.commit()
    return make_response(jsonify({"success": "Question liked"})), 200
