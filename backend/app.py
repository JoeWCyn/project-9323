from flask import Flask
import sqlite3
from config import *
from auth import auth_page
from newsfeed import newsfeed_page
from question import question_page
from comment import comment_page
from article import article_page

con = sqlite3.connect(DATABASE_NAME)
cur = con.cursor()

cur.execute(
    "CREATE TABLE IF NOT EXISTS users (id integer primary key autoincrement, name text, email text, password text, token text, expertArea text, scores integer, coins integer)")
cur.execute(
    "CREATE TABLE IF NOT EXISTS questions ( \
        id integer primary key autoincrement, \
        title text, \
        content text, \
        timeCreated numeric, \
        timeUpdated numeric, \
        author numeric, \
        replyIds blob, \
        followers blob, \
        isDeleted NOT NULL DEFAULT '0') \
        ")
cur.execute(
    "CREATE TABLE IF NOT EXISTS articles ( \
        id integer primary key autoincrement, \
        articleIds blob, \
        stepNumber numeric, \
        title text, \
        content text, \
        image text, \
        timeCreated numeric, \
        timeUpdated numeric, \
        author numeric, \
        replyIds blob, \
        followers blob, \
        isDeleted NOT NULL DEFAULT '0') \
        ")
cur.execute(
    "CREATE TABLE IF NOT EXISTS comments ( \
        id integer primary key autoincrement, \
        questionId numeric, \
        articlesId numeric, \
        content text, \
        timeCreated numeric, \
        timeUpdated numeric, \
        author numeric, \
        thumbUpBy blob, \
        isDeleted NOT NULL DEFAULT '0') \
        ")

app = Flask(__name__)
app.register_blueprint(auth_page)
app.register_blueprint(newsfeed_page)
app.register_blueprint(question_page)
app.register_blueprint(comment_page)
app.register_blueprint(article_page)


@app.route("/ping")
def ping():
    return "pong", 200


if __name__ == '__main__':

    app.run(debug=DEBUG, port= PORT)
