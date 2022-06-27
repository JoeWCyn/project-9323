from flask import Flask
import sqlite3
from config import *
from auth import auth_page
from newsfeed import newsfeed_page

con = sqlite3.connect(DATABASE_NAME)
cur = con.cursor()

cur.execute(
    "CREATE TABLE IF NOT EXISTS users (id integer primary key autoincrement, name text, email text, password text, token text)")

app = Flask(__name__)
app.register_blueprint(auth_page)
app.register_blueprint(newsfeed_page)


@app.route("/ping")
def ping():
    return "pong", 200


if __name__ == '__main__':

    app.run(debug=DEBUG, port= PORT)
