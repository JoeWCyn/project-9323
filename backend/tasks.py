#app.py
import json

from flask import Flask, request 
import src.DB as DB 
db = DB.DB() 
app = Flask(__name__)


# if a user submit a question, earn a coin
@app.route('/addcoin',methods=['post'])
def addcoin():
    userid = json.loads(request.get_data())['userid']
    return db.addcoin(userid)




"""# tasks system, if user submit a comment earn 1 coin, if user submit a article earn 2 coins,
# if user submit a question earn 1 coin, if user be thumb up earn 1 coin 
@app.route('/tasks',methods=['post'])
def tasks():
    userid = json.loads(request.get_data())['userid']
    return db.tasks(userid)




@app.route('/tasks',methods=['post'])
def tasks():
    user_id = json.loads(request.get_data())['id']
    tasks_id = json.loads(request.get_data())['tasks_id']
    return db.tasks(user_id,tasks_id)"""
