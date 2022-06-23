from flask import Flask, send_file, request
from flask_restx import Resource, Api, fields, reqparse
from datetime import datetime
from matplotlib import pyplot as plt
import pandas as pd
import urllib.parse
import urllib.request
import json
import sqlite3
import time
import re
import matplotlib.pyplot as plt

app = Flask(__name__)
api = Api(app, default="Actors",  # Default namespace
          title="Actor Dataset",  # Documentation Title
          description="This publish actors' data as a service.")  # Documentation Description

# app host/port preset
port = "5000"
host = "127.0.0.1"

# The following is the schema of actor
actor_model = api.model('actor', {
    'name': fields.String,
    'country': fields.String,
    'birthday': fields.String,
    'deathday': fields.String,
})

parser = reqparse.RequestParser()
parser.add_argument('order', choices=list(
    column for column in actor_model.keys()))


# import parameter


def imp_para():
    return reqparse.RequestParser().add_argument('name', location='args',  required=True)

# Q5 parameter


def imp_para_5():
    para = reqparse.RequestParser()
    para.add_argument('order',  location='args', type=str)
    para.add_argument('page', location='args', type=int)
    para.add_argument('size', location='args', type=int)
    para.add_argument('filter', location='args', type=str)
    return para

# Q6 parameter


def imp_para_6():
    para = reqparse.RequestParser()
    para.add_argument('format',  location='args', type=str)
    para.add_argument('by', location='args', type=str)

    return para

# create Database


def db_create():
    try:
        db = sqlite3.connect('z5108506.db')
    except:
        print("Failed to create DB")
    db_c = db.cursor()
    # check if DB existed
    db_c.execute(
        '''SELECT count(name) FROM sqlite_master WHERE type='table' AND name='actors' ''')

    if db_c.fetchone()[0] != 1:
        db_c.execute(""" CREATE TABLE actors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            TV_id integer NOT NULL,
            url_link text,
            last_update integer,
            country text,
            birthday text,
            deathday text,
            gender text,
            shows text,
            UNIQUE (TV_id)
            ) """)
    db.commit()
    db.close()

# get actor by id


def db_get_actor(id):
    db = sqlite3.connect('z5108506.db')
    db_c = db.cursor()
    try:
        actor_info = db_c.execute(
            "SELECT * FROM actors WHERE id= ?", [id]).fetchall()
    except:
        db.commit()
        db.close()
        return None
    db.commit()
    db.close()
    return actor_info

# store actors into DB


def db_store_actor(id, link, name, last_update, country, birthday, deathday, gender, shows):
    db = sqlite3.connect('z5108506.db')
    db_c = db.cursor()
    db_c.execute(
        "INSERT INTO actors (id, name, TV_id, url_link, last_update,country, birthday, deathday,gender,shows ) VALUES (NULL,?,?,?,?,?,?,?,?,?)",
        (name, id, str(link), last_update, country, birthday, deathday, gender, shows))
    try:
        actor_info = db_c.execute(
            "SELECT * FROM actors WHERE TV_id= ?", [id]).fetchall()
    except:
        db.commit()
        db.close()
        return None
    key = actor_info[0][0]
    db.commit()
    db.close()
    return key


# delete actor


def db_delete(id):
    db = sqlite3.connect('z5108506.db')
    db_c = db.cursor()
    try:
        db_c.execute("DELETE FROM actors WHERE id= ?", [id])

        db.commit()
        db.close()
        return True
    except:
        db.commit()
        db.close()
        return False


# get the DB next element's primary key


def db_get_Nextrow(table_name, curr_id):
    db = sqlite3.connect('z5108506.db')
    db_c = db.cursor()
    db_query = "SELECT * FROM " + table_name + \
        " WHERE id>" + str(curr_id) + " ORDER BY id ASC LIMIT 1"

    try:
        result = db_c.execute(db_query).fetchall()
    except:
        db.commit()
        db.close()
        return None

    if (result == []):
        try:
            db_query = "SELECT * FROM " + table_name + " ORDER BY id ASC LIMIT 1"

            result = db_c.execute(db_query).fetchall()
        except:
            db.commit()
            db.close()
            return None
    db.commit()
    db.close()
    if (result == []):
        return None
    else:
        return result[0][0]


# get the DB prev element's primary key


def db_get_Prevrow(table_name, curr_id):
    db = sqlite3.connect('z5108506.db')
    db_c = db.cursor()
    db_query = "SELECT * FROM " + table_name + \
        " WHERE id<" + str(curr_id) + " ORDER BY id DESC LIMIT 1"

    try:
        result = db_c.execute(db_query).fetchall()
    except:
        db.commit()
        db.close()
        return None

    if (result == []):
        try:
            db_query = "SELECT * FROM " + table_name + " ORDER BY id DESC LIMIT 1"

            result = db_c.execute(db_query).fetchall()
        except:
            db.commit()
            db.close()
            return None
    db.commit()
    db.close()
    if (result == []):
        return None
    else:
        return result[0][0]

# update DB


def db_update(table_name, id_key, upd_field_name, upd_val):
    db = sqlite3.connect('z5108506.db')
    db_c = db.cursor()
    db_query = "UPDATE " + table_name + " SET " + upd_field_name + \
        " = '" + str(upd_val) + "' WHERE " + "id =" + str(id_key)
    try:
        db_c.execute(db_query)
    except:
        db.commit()
        db.close()
        return False
    db.commit()
    db.close()
    return True
# update DB


def db_fetch(table_name, col_list, size, order, page, dec_ins):
    db = sqlite3.connect('z5108506.db')
    db_c = db.cursor()

    db_query = "SELECT " + col_list + " FROM " + table_name + \
        " ORDER BY " + order + " " + dec_ins + \
        " LIMIT " + str(size) + " OFFSET " + str((page-1)*size)
    try:
        res = db_c.execute(db_query).fetchall()
    except:
        db.commit()
        db.close()
        return None
    db.commit()
    db.close()
    return res
# print DB by table name


def db_print(table_name):
    db = sqlite3.connect('z5108506.db')
    db_c = db.cursor()
    db_query = "SELECT * FROM " + table_name
    db_c.execute(db_query)
    print(db_c.fetchall())
    db.commit()
    db.close()


@api.route('/actors')
@api.response(201, 'Created')
@api.response(400, 'Bad Request')
@api.response(404, "The actor was not found")
@api.response(405, "The actor has been duplicated imported")
class Import(Resource):
    @api.expect(imp_para())
    @api.doc(params={'name': 'Name of an actor or actress'})
    def post(self):
        if (imp_para().parse_args()['name'] == None):
            return {"message": "The actor was not found"}, 404
        # parse the raw string input: name to URL format,also delete all non-alpha letter
        URL_actor_name = urllib.parse.quote_plus(re.sub(r'[^A-Za-z]+', ' ',
                                                        imp_para().parse_args()['name']))
        tvmaze_src = "https://api.tvmaze.com/search/people?q=?"
        tvmaze_src_shows = "https://api.tvmaze.com/people/"
        try:
            # Get response from tvmaze API
            tvmaze_response = json.loads(urllib.request.urlopen(
                urllib.request.Request(tvmaze_src+URL_actor_name)).read())
            # Extra actor's link

            link = tvmaze_response[0]['person']['_links']['self']['href']
            name = tvmaze_response[0]['person']['name']
            id = tvmaze_response[0]['person']['id']

            last_update = tvmaze_response[0]['person']['updated']
            country = tvmaze_response[0]['person']['country']['name']
            birthday = tvmaze_response[0]['person']['birthday']
            deathday = tvmaze_response[0]['person']['deathday']
            gender = tvmaze_response[0]['person']['gender']

        except:
            return {"message": "The actor was not found"}, 404
        try:
            tvmaze_response_shows = json.loads(urllib.request.urlopen(
                urllib.request.Request(tvmaze_src_shows+str(id)+"/crewcredits")).read())
            shows = json.dumps(tvmaze_response_shows)

            

        except:
            shows = ""
            print("Get actor's shows failed")
        try:
            inserted_id = db_store_actor(id, link, name,  int(round(time.time())),
                                         country, birthday, deathday, gender, shows)
        except:
            return {"message": "The actor has been duplicated imported"}, 405

        result = {}
        result['id'] = inserted_id
        result['last-update'] = datetime.fromtimestamp(
            int(round(time.time()))).strftime("%Y-%m-%d, %H:%M:%S")
        result['_links'] = {}
        result['_links']['self'] = {}
        result['_links']['self']['href'] = "http://" + \
            str(host)+":"+str(port)+"/actors/"+str(inserted_id)

        return {"message":  result}, 201

    @api.doc(params={'order': 'Indicates ordering ascendingly or descendingly.', 'page': 'Page index', 'size': 'Shows the number of actors per page', 'filter': 'Define what attribute should be shown for each actor accordingly.'})
    @api.expect(imp_para_5())
    def get(self):

        order = imp_para_5().parse_args()['order']
        page = imp_para_5().parse_args()['page']
        size = imp_para_5().parse_args()['size']
        filter = imp_para_5().parse_args()['filter']

        # set default value
        if (order == None):
            order = "+id"
        if (page == None):
            page = 1
        if (size == None):
            size = 10
        if (filter == None):
            filter = "id,name"

        if (page < 1):
            return {"message": "Page input format is invalid"}, 400
        if (size < 0):
            return {"message": "Size input format is invalid"}, 400
        if (filter == ""):
            return {"message": "Filter input format is invalid"}, 400

        order = order.replace(" ", "")
        filter = filter.replace(" ", "")

        if (order[0] == "+"):
            sql_order = "ASC"
        elif (order[0] == "-"):
            sql_order = "DESC"
        else:
            return {"message": "Order string format is invalid"}, 400
        order_str = order
        order = order[1:]
        if (db_fetch(
            "actors", filter, size, order, page+1, sql_order) != None and db_fetch(
                "actors", filter, size, order, page+1, sql_order) != []):
            page_next = page+1
        else:
            page_next = None

        if ((page-1) > 0):
            page_prev = page-1
        else:
            page_prev = None
        actors_res = db_fetch(
            "actors", filter, size, order, page, sql_order)
        if (actors_res == [] or actors_res == None):
            return {"message": "Bad request"}, 400

        res = {}
        res['page'] = page
        res['page-size'] = size
        res['actors'] = db_fetch(
            "actors", filter, size, order, page, sql_order)
        res['_links'] = {}
        res['_links']['self'] = "http://" + \
            str(host)+":"+str(port)+"/actors?order="+order_str + \
            "&page="+str(page)+"&size="+str(size)+"&filter="+filter
        if (page_next != None):
            res['_links']['next'] = "http://" + \
                str(host)+":"+str(port)+"/actors?order="+order_str + \
                "&page="+str(page_next)+"&size="+str(size)+"&filter="+filter
        if (page_prev != None):
            res['_links']['previous'] = "http://" + \
                str(host)+":"+str(port)+"/actors?order="+order_str + \
                "&page="+str(page_prev)+"&size="+str(size)+"&filter="+filter

        return {"message":  res}, 200





if __name__ == '__main__':
    db_create()
    app.run(debug=True, host=host, port=port)
