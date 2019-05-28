from flask import jsonify, request, url_for
from app import db
from . import bp


@bp.route('/search/', methods=['GET'])
def name():
	pass
