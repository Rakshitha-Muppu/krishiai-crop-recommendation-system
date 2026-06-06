from database.db_connection import get_connection

def get_all_users():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users")

    users = cursor.fetchall()

    cursor.close()
    conn.close()

    return users

def create_user(
    full_name,
    phone_number,
    email,
    state,
    district,
    land_acres,
    land_type,
    password
):
    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO users
    (
        full_name,
        phone_number,
        email,
        state,
        district,
        land_acres,
        land_type,
        password
    )
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        full_name,
        phone_number,
        email,
        state,
        district,
        land_acres,
        land_type,
        password
    )

    cursor.execute(query, values)

    conn.commit()

    cursor.close()
    conn.close()
