from flask import Blueprint
from config import *

question_page = Blueprint("question", __name__)

@question_page.route('/question/ping', methods=['GET'])
def question_ping():
    return "Pong", 200
