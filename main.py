#! /usr/bin/env python3

from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker, relationship
from database_setup import User, Task, Base
import os
import sys
from flask import Flask, render_template, request, redirect
from flask import jsonify, url_for, flash
from flask import session as login_session
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

app = Flask(__name__)

CLIENT_ID = json.loads(
    open('client_secrets.json', 'r').read())['web']['client_id']
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

@app.route('/todo.json', methods=['POST'])
def todosJSON():
    data = request.values
    print( data['name'] )
    task = session.query(Task).all()
    return jsonify(task=[r.serialize for r in task])



if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
