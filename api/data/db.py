import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()
DB_URL = os.getenv("DB_URL")

def db_conn():
    try:
        conn = psycopg2.connect(DB_URL)
    except:
        print("Conn error.")

    return conn.cursor()
