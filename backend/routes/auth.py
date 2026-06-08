from flask import Blueprint, request, jsonify

from services.user_service import (
    create_user,
    get_user_by_email
)

from utils.validators import (
    validate_email,
    validate_phone,
    validate_password
)

auth_bp = Blueprint("auth", __name__)

# blueprint means Group related routes together

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not validate_email(data["email"]):

        return jsonify(
            {
                "message": "Invalid email"
            }
        )

    if not validate_phone(data["phone_number"]):

        return jsonify(
            {
                "message": "Invalid phone number"
            }
        )

    if not validate_password(data["password"]):

        return jsonify(
            {
                "message": "Password must be at least 6 characters"
            }
        )

    create_user(
        data["full_name"],
        data["phone_number"],
        data["email"],
        data["state"],
        data["district"],
        data["land_acres"],
        data["land_type"],
        data["password"]
    )

    return jsonify(
        {
            "message": "User registered successfully"
        }
    )

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    user = get_user_by_email(data["email"])

    if user is None:

        return jsonify(
            {
                "message": "User not found"
            }
        )

    if user["password"] != data["password"]:

        return jsonify(
            {
                "message": "Invalid password"
            }
        )

    return jsonify(
        {
            "message": "Login successful",
            "user_id": user["user_id"],
            "full_name": user["full_name"],
            "state": user["state"],
            "district": user["district"],
            "land_acres": user["land_acres"],
            "land_type": user["land_type"]
        }
    )