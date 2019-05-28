"""Load cities from https://github.com/grammakov/USA-cities-and-states into city and state db tables """

import csv
import psycopg2
from dotenv import load_dotenv
import os
from slugify import slugify


load_dotenv()


DB_URL = os.getenv("DB_URL")

try:
    conn = psycopg2.connect(DB_URL)
except:
    print("Conn error.")

cur = conn.cursor()

# SELECT * FROM (SELECT  *,(3959 * acos(cos(radians(LATITUDE)) * cos(radians(latitude)) * cos(radians(longitude) - radians(LONGITUDE)) + sin(radians(LATITUDE)) * sin(radians(latitude)))) AS distance FROM airport) ALIAS WHERE distance < 20 ORDER BY distance LIMIT 20;
