from flask import Blueprint
from config import *

newsfeed_page = Blueprint("newsfeed", __name__)

@newsfeed_page.route('/newsfeed/ping', methods=['GET'])
def newsfeed_ping():
    return "Pong", 200
