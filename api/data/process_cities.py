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

with open('uscitiesv1.4.csv') as cities:
    reader = csv.reader(cities, delimiter=',')
    for city in reader:
    # "city","city_ascii","state_id","state_name","county_fips","county_name","lat","lng","population","population_proper","density","source","incorporated","timezone","zips","id"
        try:
            name = city[0]
            st_abb = city[2]
            lat = city[6]
            lng = city[7]
        except:
            print(city)

        cur.execute(f"Select * from city where longitude = '{lng}' and latitude = '{lat}'")
        exists = cur.fetchall()
        if exists:
            print(exists)
        else:
            cur.execute(f"Select id from state where abbreviation = '{st_abb}'")
            state = cur.fetchone()
            print(f'state: {state[0]}')
            sql = "insert into city(name, state_id, slug, latitude, longitude) values(%s, %s, %s, %s, %s)"
            cur.execute(sql, (name, state[0], slugify(name), lat, lng))
            conn.commit()

cur.close()
conn.close()
