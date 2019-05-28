from app import db


class Airline(db.Model):
    __tablename__ = 'airline'

    id = db.Column(db.Integer, primary_key=True)
    iata = db.Column(db.String(4))
    icao = db.Column(db.String(4))
    name = db.Column(db.String(255))

    country_id = db.Column(db.Integer, db.ForeignKey('country.id'), nullable=False)

    def __repr__(self):
        return f'{self.iata}: {self.name} - {self.country}'


class Airport(db.Model):
    __tablename__ = 'airport'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    alias = db.Column(db.String(255))
    iata = db.Column(db.String(4))
    icao = db.Column(db.String(4))
    latitude = db.Column(db.Float())
    longitude = db.Column(db.Float())
    altitude = db.Column(db.Float())

    def get_absolute_url(self):
        return "/airports/%s/" % self.slug

    def __repr__(self):
        return f'{self.iata}: {self.name} - {self.city}'


class GSAFlight(db.Model):
    __tablename__ = 'gsa_flight'

    id = db.Column(db.Integer, primary_key=True)
    reservation_date = db.Column(db.Date(), nullable=True)
    trip_date = db.Column(db.Date())
    coach_class = db.Column(db.Boolean(), nullable=True)
    invoice = db.Column(db.Numeric(10, 2))
    tax = db.Column(db.Numeric(10, 2), nullable=True)
    online = db.Column(db.Boolean(), nullable=True)
    fare_type = db.Column(db.String(255), nullable=True)

    airline_id = db.Column(db.Integer, db.ForeignKey('airline.id'), nullable=False)
    origin_id = db.Column(db.Integer, db.ForeignKey('airport.id'), nullable=False)
    origin = db.relationship('Airport', backref=db.backref('departures', order_by=id), foreign_keys=origin_id)
    destination_id = db.Column(db.Integer, db.ForeignKey('airport.id'), nullable=False)
    destination = db.relationship('Airport', backref=db.backref('arrivals', order_by=id), foreign_keys=destination_id)

    def get_absolute_url(self):
        return f'/flight/{self.origin}/{self.destination}/{self.trip_date}'

    def __repr__(self):
        return f'GSA FLIGHT: {self.trip_date} {self.origin} - {self.destination}'
