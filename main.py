#! /usr/bin/env python3

from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker, relationship
from database_setup import User, Task, Base
import os
import sys
# from flask_sqlalchemy import exc
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, redirect
from flask import jsonify, url_for, flash
from flask import session
import random
import string
# new imports for authentication and authorization
# imports for this step
# from oauth2client.client import AccessTokenRefreshError
from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
import httplib2
from flask import make_response
import json
import requests
import codecs


app = Flask(__name__)
app.debug=True
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:zxcvbnm@localhost/todo"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True


db = SQLAlchemy(app)
db.init_app(app)

APPLICATION_NAME = "Todo App"

# connect to db and create db session
engine = create_engine('mysql+pymysql://root:zxcvbnm@localhost/todo')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

"""
Function that will return JSON APis
to view User and Task Information
"""


@app.route('/')
def mainHandel():
    return render_template('index.html')

@app.route('/todo.json', methods=['GET','POST', 'PUT', 'DELETE', 'PATCH'])
def todosJSON():
    if request.method == 'POST':
        try:
            body = request.data
            body = json.loads(body.decode('utf-8'))
            user = session.query(User).filter_by(email = body['email']).one_or_none()
            if user:
                task = session.query(Task).filter_by(user_id = user.id).all()
                return jsonify(tasks=[r.serialize for r in task],count = len(task))
            user = User(name=body['name'], email=body['email'])
            session.add(user)
            session.commit()
            return jsonify(tasks = [],count = 0)
        except exceptions.SQLAlchemyError:
            sys.exit("Encountered general SQLAlchemyError.  Call an adult!")

    if request.method == 'PUT':
        body = request.data
        body = json.loads(body.decode('utf-8'))
        user = session.query(User).filter_by(email = body['email']).one_or_none()
        if not user:
            user = User(name=body['name'], email=body['email'])
            session.add(user)
            session.commit()

        todo = Task(task=body['task'], user_id=user.id)
        session.add(todo)
        session.commit()
        return jsonify(todo.serialize)

    if request.method == 'DELETE':
        body = request.data
        body = json.loads(body.decode('utf-8'))
        user = session.query(User).filter_by(email = body['email']).one_or_none()
        if user:
            task  = session.query(Task).filter_by(user_id = user.id,id=body['id']).one_or_none()
            if task:
                session.delete(task)
                session.commit()
                return jsonify(success=True)
        return jsonify(error="You are not authorized to this todo!")

    if request.method == 'PATCH':
            body = request.data
            body = json.loads(body.decode('utf-8'))
            user = session.query(User).filter_by(email = body['email']).one_or_none()
            if user:
                todo = session.query(Task).filter_by(user_id = user.id,id=body['id']).one_or_none()
                todo.task = body['task']
                todo.status = body['status']
                session.add(todo)
                session.commit()
                return jsonify(todo.serialize)
            return jsonify(error="You are not authorizedto this todo!")



    # return "GET HANDLER NOT DEFINED"
    task = session.query(Task).all()
    return jsonify(tasks=[r.serialize for r in task],count = len(task))






if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
