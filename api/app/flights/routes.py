from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from flask_cors import cross_origin
from . import bp
from .models import Airport, GSAFlight


app = Flask(__name__)
ma = Marshmallow(app)


class AirportSchema(ma.Schema):
    class Meta:
        model = Airport


class GSAFlightSchema(ma.Schema):
    origin = ma.Nested(AirportSchema, only=['name', 'iata', 'id'], many=False)
    destination = ma.Nested(AirportSchema, only=['name', 'iata', 'id'], many=False)

    class Meta:
        fields = ('id', 'invoice', 'tax', 'reservation_date', 'trip_date', 'origin', 'destination', 'origin_id')


gsa_flight_schema = GSAFlightSchema(many=True)


@bp.route('/flight', methods=['GET'])
@bp.route('/flight/<o_iata>/<d_iata>/', methods=['GET'])
@cross_origin()
def get_flight(o_iata=None, d_iata=None):
    query = request.args.get('query')

    if query:
        all_flights = Airport.query.filter_by(iata=query.upper()).with_entities('id', 'name').all()
        return jsonify({'flights': all_flights})

    else:
        # all_flights = GSAFlight.query.join(Airport, GSAFlight.origin_id==Airport.id).filter(Airport.iata==o_iata.upper()).filter(Airport.iata==d_iata.upper()).all()
        all_flights = GSAFlight.query.filter(GSAFlight.origin.has(Airport.iata==o_iata.upper())).filter(GSAFlight.destination.has(Airport.iata==d_iata.upper())).all()
        flights = gsa_flight_schema.dump(all_flights)
        return jsonify({'flights': flights})
