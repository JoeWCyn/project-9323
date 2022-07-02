from flask import Blueprint
from config import *
from flask_cors import CORS

newsfeed_page = Blueprint("newsfeed", __name__)
CORS(newsfeed_page)


@newsfeed_page.route('/newsfeed/ping', methods=['GET'])
def newsfeed_ping():
    return "Pong", 200
