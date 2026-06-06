import mysql.connector

def get_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="rakshitha@2007",
        database="agriculture_db"
    )
    return connection