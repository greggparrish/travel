from flask import Blueprint

bp = Blueprint('cities', __name__)

from app.cities import routes
