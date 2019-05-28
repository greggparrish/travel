from slugify import slugify
from db import db_conn

cur = db_conn()
cur.execute(f"Select * from airline")
airlines = cur.fetchall()
for a in airlines:
    sql = "update airline set slug"
    cur.execute(sql, (name, iata, icao, slugify(f"{name} {country}"), country[0]))
    conn.commit()

print(exists)
