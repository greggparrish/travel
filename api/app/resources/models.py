import base64
from datetime import datetime, timedelta
import json
import os
from flask import current_app, url_for
from app import db


class (db.Model):
    __tablename__ = 'airline'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    iata = db.Column(db.String(4))
    country = db.Column(db.String(255))

    def __repr__(self):
        return f'{self.iata}: {self.name} - {self.country}'
