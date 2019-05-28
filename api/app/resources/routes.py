from flask import jsonify, request, url_for
from api import db
from .models import MODELS
from .routes import bp


@bp.route('/', methods=['GET'])
def name():
	pass
