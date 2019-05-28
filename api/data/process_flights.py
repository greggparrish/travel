"""Load cities from https://github.com/grammakov/USA-cities-and-states into city and state db tables """

import csv
import psycopg2
from dotenv import load_dotenv
import os
from slugify import slugify
from decimal import Decimal


load_dotenv()


DB_URL = os.getenv("DB_URL")

try:
    conn = psycopg2.connect(DB_URL)
except:
    print("Conn error.")

cur = conn.cursor()

with open('flights.csv') as cities:
    reader = csv.reader(cities, delimiter=',')
    stype = None
    for city in reader:
        # GDS Record Locator,Reservation Date,Ticket Issue Date,Trip Departure Date,Ticket Number,Airline Name,Cabin Class,Domestic / International Indicator,Origin Airport Code,Destination Airport Code,Routing,Invoice Amount,Tax Amount,Total Amount,Mileage,Exchange Indicator,Exchange Original Ticket Number,Refund  Indicator,Original Invoice Number,Online Indicator,Fare Category

        try:
            reservation_date = city[1]
            trip_date = city[3]
            flight_class = city[6]
            invoice = city[11]
            tax = city[12]
            online = city[19]
            fare_type = city[20]
            airline = city[5]
            origin = city[8]
            destination = city[9]
            international = city[7]
        except:
            print(city)

        if international and international != 'I':
            cur.execute(f"Select id from airport where iata='{origin}'")
            origin_id = cur.fetchone()
            cur.execute(f"Select id from airport where iata='{destination}'")
            destination_id = cur.fetchone()
            cur.execute(f"Select id from airline where name='{airline.title()}'")
            airline_id = cur.fetchone()

            if airline_id:
                airline_id = airline_id[0]
            if airline == 'AIRTRAN AIRLINES':
                airline_id = 24
            if airline == 'AMERICAN':
                airline_id = 5
            if airline == 'US AIRWAYS':
                airline_id = 95
            if airline == 'SOUTHWEST AIR':
                airline_id = 86
            if airline == 'JET BLUE AIRWAYS':
                airline_id = 59
            if airline == 'ALASKA':
                airline_id = 170
            if airline == 'CONTINENTAL':
                airline_id = 38
            if airline == 'HAWAIIAN':
                airline_id = 52
            if airline == 'MIDWEST EXPRESS':
                airline_id = 66
            if airline == 'JETBLUE TICKETLESS':
                airline_id = 59
            if airline == 'GREAT LAKES LTD':
                airline_id = 50
            if airline == 'SOUTHWEST':
                airline_id = 86
            if airline == 'AIRTRAN AIRWAYS':
                airline_id = 24
            if airline == 'PENINSULA AIR':
                airline_id = 75
            if airline == 'ALOHA ISLANDAIR':
                airline_id = 4
            if airline == 'DELTA':
                airline_id = 40
            if airline == 'DELTA AIR LINES':
                airline_id = 40
            if airline == 'ERA AVIATION':
                airline_id = 134
            if origin_id and destination_id and airline_id:
                if not reservation_date:
                    reservation_date = None
                tax = None if tax == '' else abs(Decimal(tax))
                invoice = None if invoice == '' else abs(Decimal(invoice))

                sql = "insert into gsa_flight(reservation_date, trip_date, flight_class, invoice, tax, online, fare_type, airline_id, origin_id, destination_id) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cur.execute(sql, (reservation_date, trip_date, flight_class, invoice, tax, online, fare_type, airline_id, origin_id[0], destination_id[0]))
                conn.commit()
            else:
                print(airline)

cur.close()
conn.close()
