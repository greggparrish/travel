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

with open('airlines.dat') as cities:
    reader = csv.reader(cities, delimiter=',')
    stype = None
    for airline in reader:
        # ID,Name,alias, iata, icao, callsign, country, active
        # 21317,"Svyaz Rossiya","Russian Commuter ","7R","SJM","RussianConnecty","Russia","Y"

        try:
            name = airline[1]
            country = airline[6]
            iata = airline[3]
            icao = airline[4]
            active = airline[7]
        except:
            print(airline)

        if active == 'Y' and country in ['United States', ]:
            cur.execute(f"Select * from airline where iata='{iata}'")
            exists = cur.fetchall()
            if exists:
                pass
            else:
                cur.execute(f"Select id from country where name = '{country}'")
                country = cur.fetchone()
                sql = "insert into airline(name, iata, icao, country_id) values(%s, %s, %s, %s)"
                cur.execute(sql, (name, iata, icao, country[0]))
                conn.commit()

cur.close()
conn.close()
