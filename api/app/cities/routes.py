from flask import Flask, jsonify
from flask_marshmallow import Marshmallow
from flask_cors import cross_origin
from .models import City, State, Country
from . import bp

app = Flask(__name__)
ma = Marshmallow(app)


class CountrySchema(ma.Schema):
    class Meta:
        fields = ('name', 'id', 'abbreviation', 'slug')


class StateSchema(ma.Schema):
    country = ma.Nested(CountrySchema, only=["name"], many=False)

    class Meta:
        model = State
        fields = ('name', 'slug', 'country')


class CitySchema(ma.Schema):
    """ Use marshmallow to serialize db query into json response """
    state = ma.Nested(StateSchema, only=["name"], many=False)

    class Meta:
        fields = ('name', 'slug', 'state', 'airports', 'latitude', 'longitude')


country_schema = CountrySchema(many=True)
state_schema = StateSchema(many=True)
city_schema = CitySchema(many=True)


@bp.route('/cities/', methods=['GET'])
def get_cities():
    all_cities = City.query.all()
    cities = city_schema.dump(all_cities)
    return jsonify({'cities': cities})


@bp.route('/states/', methods=['GET'])
def get_states():
    all_states = State.query.all()
    states = state_schema.dump(all_states)
    return jsonify({'states': states})


@bp.route('/countries/', methods=['GET'])
def get_countries():
    all_countries = Country.query.all()
    countries = country_schema.dump(all_countries)
    return jsonify({'countries': countries})
