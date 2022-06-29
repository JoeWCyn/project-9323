from flask import Blueprint
from config import *

article_page = Blueprint("article", __name__)


@article_page.route('/article/ping', methods=['GET'])
def article_ping():
    return "Pong", 200
