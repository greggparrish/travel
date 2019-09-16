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

with open('airports-extended.dat') as cities:
    reader = csv.reader(cities, delimiter=',')
    stype = None
    for city in reader:
        # ID,Name,City,Country,IATA,ICAO,Lat,Long,Altitude,Time Zone,DST,Tz,Type,Source
        # 1,"Goroka Airport","Goroka","Papua New Guinea","GKA","AYGA",-6.081689834590001,145.391998291,5282,10,"U","Pacific/Port_Moresby","airport","OurAirports"

        try:
            name = city[1]
            alias = city[2]
            country = city[3]
            iata = city[4]
            icao = city[5]
            lat = city[6]
            lng = city[7]
            alt = city[8]
            stype = city[12]
        except:
            print(city)

        if stype == 'airport' and country in ['United States']:
            cur.execute(f"Select * from airport where latitude={lat} and longitude={lng}")
            exists = cur.fetchall()
            if exists:
                pass
            else:
                sql = "insert into airport(name, alias, iata, icao, latitude, longitude, altitude) values(%s, %s, %s, %s, %s, %s, %s)"
                cur.execute(sql, (name, alias, iata, icao, lat, lng, alt))
                conn.commit()

cur.close()
conn.close()
