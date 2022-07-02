from flask import Blueprint
from config import *
from flask_cors import CORS

comment_page = Blueprint("comment", __name__)
CORS(comment_page)


@comment_page.route('/comment/ping', methods=['GET'])
def comment_ping():
    return "Pong", 200
