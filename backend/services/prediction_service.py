from database.db_connection import get_connection
def create_prediction(
    user_id,
    soil_type,
    location,
    state,
    district,
    season,
    crop_input,
    temperature,
    rainfall,
    humidity,
    land_acres,
    recommended_crop,
    predicted_yield=None
):

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO predictions
    (
        user_id,
        soil_type,
        location,
        state,
        district,
        season,
        crop_input,
        temperature,
        rainfall,
        humidity,
        land_acres,
        recommended_crop,
        predicted_yield
    )
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        user_id,
        soil_type,
        location,
        state,
        district,
        season,
        crop_input,
        temperature,
        rainfall,
        humidity,
        land_acres,
        recommended_crop,
        predicted_yield
    )

    cursor.execute(query, values)

    conn.commit()

    cursor.close()
    conn.close()

# for Prediction History
def get_user_predictions(user_id):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT *
    FROM predictions
    WHERE user_id = %s
    ORDER BY created_at DESC
    """

    cursor.execute(query, (user_id,))

    predictions = cursor.fetchall()

    cursor.close()
    conn.close()

    return predictions