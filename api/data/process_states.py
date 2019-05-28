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

with open('us_cities_states_counties.csv') as cities:
    reader = csv.reader(cities, delimiter='|')
    for city in reader:
        # City|State short name|State full name|County|City Alias Mixed Case
        try:
            abbr = city[1]
            state = city[2]
        except:
            print(city)

        cur.execute(f"Select * from state where name = '{state}' and abbreviation = '{abbr}'")
        exists = cur.fetchall()
        if exists:
            print(exists)
        else:
            cur.execute(f"insert into state(name, abbreviation, country_id, slug) values('{state}', '{abbr}', 1,'{slugify(state)}')")
            conn.commit()

cur.close()
conn.close()
