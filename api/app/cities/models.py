import base64
from datetime import datetime, timedelta
import json
import os
from flask import current_app, url_for
from slugify import slugify
from app import db


city_airports = db.Table('city_airports',
                         db.Column('city_id', db.Integer, db.ForeignKey('city.id')),
                         db.Column('airport_id', db.Integer, db.ForeignKey('airport.id'))
                         )

class City(db.Model):
    __tablename__ = 'city'

    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float())
    longitude = db.Column(db.Float())
    name = db.Column(db.String(255))
    slug = db.Column(db.String(150))

    state_id = db.Column(db.Integer, db.ForeignKey('state.id'), nullable=False)
    airports = db.relationship('Airport', secondary=city_airports, lazy='subquery', backref=db.backref('cities', lazy=True))

    def save(self):
        super(City, self).save()
        slugcheck = (self.name, self.state, self.country)
        self.slug = '%s' % (
            slugify(" ".join(str(s) for s in slugcheck if s is not None))
        )
        super(City, self).save()

    def get_absolute_url(self):
        return "/local_expenses/%d/%s/" % (self.id, self.slug)

    def airport_list(self):
        return "\n".join([a.iata for a in self.airports.all()])

    def __repr__(self):
        return f'{self.name}, {self.state}'


class State(db.Model):
    __tablename__ = 'state'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    abbreviation = db.Column(db.String(2))
    slug = db.Column(db.String(150))

    cities = db.relationship(City, backref='state', lazy=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'), nullable=False)

    def __repr__(self):
        return f'{self.name}, {self.country}'


class Country(db.Model):
    __tablename__ = 'country'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    abbreviation = db.Column(db.String(6))
    slug = db.Column(db.String(150))

    states = db.relationship(State, backref='country', lazy=True)

    def __repr__(self):
        return f'{self.name}'
