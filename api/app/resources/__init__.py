from flask import Blueprint

bp = Blueprint('resources', __name__)

from app.resources import routes
