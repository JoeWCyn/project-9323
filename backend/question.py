from flask import Blueprint
from config import *
from flask_cors import CORS

question_page = Blueprint("question", __name__)
CORS(question_page)


@question_page.route('/question/ping', methods=['GET'])
def question_ping():
    return "Pong", 200
