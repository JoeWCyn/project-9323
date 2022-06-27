from flask import Blueprint
from config import *

quetion_page = Blueprint("quetion", __name__)

@quetion_page.route('/quetion/ping', methods=['GET'])
def question_ping():
    return "Pong", 200
