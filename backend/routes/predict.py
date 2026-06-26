from flask import Blueprint, request, jsonify

import pickle

from services.prediction_service import (
    create_prediction,
    get_user_predictions
)

# LOAD MODEL

with open("../ml-model/crop_model.pkl", "rb") as file:
    crop_model = pickle.load(file)

with open("../ml-model/crop_label_encoder.pkl", "rb") as file:
    crop_encoder = pickle.load(file)

# BLUEPRINT

predict_bp = Blueprint(
    "predict",
    __name__
)

# SOIL MAPPING
soil_mapping = {
    "Black Soil":    [90, 40, 40, 6.8],
    "Red Soil":      [60, 35, 30, 6.0],
    "Clay Soil":     [80, 45, 40, 7.0],
    "Loamy Soil":    [85, 50, 45, 6.5],
    "Sandy Soil":    [40, 20, 20, 5.8],
    "Alluvial Soil": [75, 45, 35, 6.7],
    "Laterite Soil": [45, 25, 25, 5.5]
}

# PREDICT

@predict_bp.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    soil_type = data["soil_type"]

    N, P, K, ph = soil_mapping[soil_type]

    crop_features = [[
        N,
        P,
        K,
        # float(data["temperature"]),
        # float(data["humidity"]),
        # ph,
        # float(data["rainfall"])
        28,
        85,
        ph,
        180

    ]]

    prediction = crop_model.predict(crop_features)[0]

    recommended_crop = crop_encoder.inverse_transform([prediction])[0]

    create_prediction(
        data["user_id"],
        soil_type,
        data["location"],
        data["state"],
        data["district"],
        data["season"],
        data["crop_input"],
        data["temperature"],
        data["rainfall"],
        data["humidity"],
        data["land_acres"],
        recommended_crop
    )

    return jsonify({
        "recommended_crop": recommended_crop
    })

# HISTORY

@predict_bp.route("/history/<int:user_id>", methods=["GET"])
def history(user_id):

    predictions = get_user_predictions(user_id)

    for prediction in predictions:
        prediction["created_at"] = prediction["created_at"].strftime("%d/%m/%Y")

    return jsonify(predictions)


# LATEST PREDICTION
@predict_bp.route("/latest_prediction/<int:user_id>", methods=["GET"])
def latest_prediction(user_id):

    predictions = get_user_predictions(user_id)

    if len(predictions) == 0:
        return jsonify({})

    return jsonify(predictions[0])