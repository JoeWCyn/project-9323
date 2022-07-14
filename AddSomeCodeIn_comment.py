from email.policy import default
from flask import Blueprint, request, make_response, jsonify
from config import *
from flask_cors import CORS
import sqlite3
from datetime import datetime
from time import time
from helper import get_user_id_from_header,get_unix_time,authenticated

comment_page = Blueprint("comment", __name__)
CORS(comment_page)

con = sqlite3.connect(DATABASE_NAME)
cur = con.cursor()

def update_score(user_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    ret = dict()

    sql = "SELECT scores from users where id = {} or token == '{}'".format(user_id,user_id)

    rows = cur.execute(sql).fetchall()
    score = int(rows[0][0])
    score+=1
    sql = "UPDATE users SET scores = {} where id = {} or token = '{}'".format(
         score,user_id,user_id)
    cur.execute(sql)
    con.commit()

@comment_page.route('/comment/questions/<int:question_id>',methods=['POST'])
@authenticated#check whether the user login
def comment_question(question_id):
    # connect to the sqlite3
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    ## check whether the questions exists
    c1=cur.execute(f'SELECT 1 FROM questions WHERE id={question_id} LIMIT 1;').fetchall()
    if c1 != []:
        id=None
        articleId=None
        timeCreated=get_unix_time()
        timeUpdated=timeCreated
        thumbUpBy=None # user id starts from 1?
        is_deleted=0
        #############for regular################
        data = request.get_json()
        content = data.get('content', None)
        userID = get_user_id_from_header()
        update_score(userID)
        ###########user for post man############
        # content = 'aaa'
        # userID=2          
        ###########user for post man############
        # just create an comment not edit
        cur.execute(f"insert into comments values(?,?,?,?,?,?,?,?,?)",
                    [id, question_id, articleId, content,timeCreated, timeUpdated, userID, thumbUpBy,is_deleted ])
        con.commit()
    else:
        print('error')
        con.close()
        return make_response(jsonify({"error": "this question can not be found"})), 404
    id = cur.lastrowid
    content=cur.execute(f"select content from comments where id={id}").fetchall()[0][0]
    con.close()
    
    # can get the last autoincrement data(for this table  is the id)
    # print(id)
    return make_response(jsonify({ "comment_content":content,"comment_id": id})), 200



@comment_page.route('/comment/articles/<int:article_id>',methods=['POST'])
@authenticated#check whether the user login
def comment_article(article_id):
    # connect to the sqlite3
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    ## check whether the articles exists
    c1=cur.execute(f'SELECT 1 FROM articles WHERE id={article_id} LIMIT 1;').fetchall()
    if c1 != []:
        id=None
        questionId=None
        timeCreated=get_unix_time()
        timeUpdated=timeCreated
        thumbUpBy=None # user id starts from 1?
        is_deleted=0
        #############for regular################
        data = request.get_json()
        content = data.get('content', None)
        userID = get_user_id_from_header()
        update_score(userID)
        ###########user for post man############
        # content = 'aaa'
        # userID=2          
        ###########user for post man############
        # just create an comment not edit
        cur.execute(f"insert into comments values(?,?,?,?,?,?,?,?,?)",
                    [id, questionId, article_id, content,timeCreated, timeUpdated, userID, thumbUpBy,is_deleted ])
        con.commit()
    else:
        print('error')
        con.close()
        return make_response(jsonify({"error": "this article can not be found"})), 404
    id = cur.lastrowid
    content=cur.execute(f"select content from comments where id={id}").fetchall()[0][0]
    con.close()
    
    # can get the last autoincrement data(for this table  is the id)
    print(id)
    return make_response(jsonify({"comment_content":content,"comment_id": id})), 200
