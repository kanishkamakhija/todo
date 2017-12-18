import sys
import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, func, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    email = Column(String(250), nullable=False)


class Task(Base):
    __tablename__ = 'todo'

    id = Column(Integer, primary_key=True)
    task = Column(String(250), nullable=False)
    status = Column(String(150), nullable=False)
    created_date = Column(DateTime, default=func.now())
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)

    #decorator method which help define what data we want to send across another application.
    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'task': self.task,
            'id': self.id,
        }






engine = create_engine('mysql+pymysql://root:zxcvbnm@localhost/todo')


Base.metadata.create_all(engine)
