from flask import Blueprint
from config import *

newsfeed_page = Blueprint("newsfeed", __name__)

DATABASE_NAME = "FightingTiger.db"


@newsfeed_page.route('/newsfeed/ping', methods=['GET'])
def auth_ping():
    return "Pong", 200
