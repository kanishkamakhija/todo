#! /usr/bin/env python3

from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker, relationship
from database_setup import User, Task, Base
import os
import sys
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

@app.route('/todo.json', methods=['GET','POST', 'PUT', 'DELETE'])
def todosJSON():
    if request.method == 'POST':
        body = request.data
        body = json.loads(body.decode('utf-8'))
        print(body)
        user = session.query(User).filter_by(email = body['email']).one_or_none()
        if user:
            print("I am working")
            print("Name:", user.name)
            task = session.query(Task).filter_by(user_id = user.id).all()
            print(task)
            return jsonify(task=[r.serialize for r in task],count = len(task))
        user = User(name=body['name'], email=body['email'])
        session.add(user)
        session.commit()
        return jsonify(task = [],count = 0)

    if request.method == 'PUT':
        body = request.data
        body = json.loads(body.decode('utf-8'))
        email = body['email']
        if email:
            todo = Task(task=body['todo'],status=body['status'],created_date=body['created_date'])
            session.add(todo)
            session.commit()
            task = session.query(Task).all()
            return jsonify(task=[r.serialize for r in task],count = len(task))


    return "GET HANDLER NOT DEFINED"



if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
