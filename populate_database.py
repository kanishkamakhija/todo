from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database_setup import User, Task, Base

engine = create_engine('mysql+pymysql://root:zxcvbnm@localhost/todo')
# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
# A DBSession() instance establishes all conversations with the database
# and represents a "staging zone" for all the objects loaded into the
# database session object. Any change made against the objects in the
# session won't be persisted into the database until you call
# session.commit(). If you're not happy about the changes, you can
# revert all of them back to the last commit by calling
# session.rollback()
session = DBSession()


# Create dummy user
user = User(name="Robo Barista", email="tinnyTim@udacity.com")
session.add(user)
session.commit()

user = session.query(User).filter_by(email="tinnyTim@udacity.com").one()
# Create dummy task
task = Task(task="hagna", status= False, user_id=user.id)
session.add(task)
session.commit()

# Task.__table__.drop()
# User.__table__.drop()
