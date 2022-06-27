from flask import Blueprint
from config import *

comment_page = Blueprint("comment", __name__)

@comment_page.route('/comment/ping', methods=['GET'])
def comment_ping():
    return "Pong", 200
