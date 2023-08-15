"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)
app = Flask ( __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def user_signup():
    user = User(
        email=request.json.get("email", None),
        password=request.json.get("password", None),
        is_active=True
    )
    db.session.add(user)
    db.session.commit()
    response_body = {
        "message": "User register Ok",
        "id": user.id,
        "email": user.email
    }
    return jsonify(response_body), 201

@api.route("/login", methods=["POST"])
def login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 201


@api.route("/private", methods=["GET"])
@jwt_required()
def protected():

    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=current_user_id), 200

if __name__ == "__main__":
    api.run()