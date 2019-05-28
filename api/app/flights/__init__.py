from flask import Blueprint

bp = Blueprint('flights', __name__)

from app.flights import routes
