import flask
from flask import Flask, request, jsonify, g
from datetime import timedelta, time as dt_time, datetime
import mysql
import mysql.connector
import os
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

def _make_json_safe(row: dict) -> dict:
    safe = {}
    for k, v in row.items():
        if isinstance(v, timedelta):
            safe[k] = str(v)
        elif isinstance(v, dt_time):
            safe[k] = v.strftime('%H:%M:%S')
        elif isinstance(v, datetime):
            safe[k] = v.isoformat()
        else:
            safe[k] = v
    return safe

DB_CONFIG = {
    "user" : "root",
    "password" : os.getenv("DB_PASS"),
    "host": "127.0.0.1",
    "database": "flight_tracking",
    "port": 3306
}



def get_db():
    if "db" not in g:
        g.db = mysql.connector.connect(**DB_CONFIG)
        print("db connected")
    return g.db


def query(sql, params=None, commit=False):
    db = get_db()
    cur = db.cursor(dictionary=True)
    cur.execute(sql, params or {})
    if commit:
        db.commit()
        cur.close()
        return None
    rows = cur.fetchall()
    cur.close()
    return rows

@app.teardown_appcontext
def close_db(exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()

@app.errorhandler(mysql.connector.Error)
def handle_db_error(e):
    db = g.pop("db", None)
    if db is not None:
        db.close()

    if isinstance(e, mysql.connector.IntegrityError) or isinstance(e, mysql.connector.ProgrammingError):
        status_code = 400
    else:
        status_code = 500

    return jsonify({"error": str(e)}), status_code

## VIEWS
@app.route('/api/flights-in-air', methods=["GET"])
def get_flights_in_the_air():
    rows = query("SELECT * FROM flights_in_the_air;")
    safe_rows = [_make_json_safe(r) for r in rows]
    return safe_rows
    
@app.route('/api/flights-on-ground', methods=["GET"])
def get_flights_on_ground():
    rows = query("SELECT * FROM flights_on_the_ground;")
    safe_rows = [_make_json_safe(r) for r in rows]
    return jsonify(safe_rows)

@app.route('/api/people-in-air', methods=["GET"])
def get_people_in_air():
    rows = query("SELECT * FROM people_in_the_air;")
    safe_rows = [_make_json_safe(r) for r in rows]
    return jsonify(safe_rows)

@app.route('/api/people-on-ground', methods=["GET"])
def get_people_on_ground():
    rows = query("SELECT * FROM people_on_the_ground;")
    safe_rows = [_make_json_safe(r) for r in rows]
    return jsonify(safe_rows)

@app.route('/api/route-summary', methods=["GET"])
def get_route_summary():
    rows = query("SELECT * FROM route_summary;")
    safe_rows = [_make_json_safe(r) for r in rows]
    return jsonify(safe_rows)


@app.route('/api/alternative-airports', methods=["GET"])
def get_alternative_airports():
    rows = query("SELECT * FROM alternative_airports;")
    safe_rows = [_make_json_safe(r) for r in rows]
    return jsonify(safe_rows)

## PROCEDURES
@app.route('/api/add_airplane', methods=["POST"])
def add_airplane():
    data = request.json or {}
    query(
        "CALL add_airplane(%s, %s, %s, %s, %s, %s, %s, %s, %s);",
        (data.get('airlineID'), data.get('tail_num'), data.get('seat_capacity'), data.get('speed'),
            data.get('locationID'), data.get('plane_type'), data.get('maintenanced'), data.get('model'),
            data.get('neo')),
        commit=True
    )
    return jsonify({'status': 'success'})


@app.route('/api/add_airport', methods=["POST"])
def add_airport():
    data = request.json or {}
    query(
        "CALL add_airport(%s, %s, %s, %s, %s, %s);",
        (data.get('airportID'), data.get('airport_name'), data.get('city'), data.get('state'),
          data.get('country'), data.get('locationID')),
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})

@app.route('/api/add_person', methods=["POST"])
def add_person():
    data = request.json or {}
    query(
        "CALL add_person(%s, %s, %s, %s, %s, %s, %s, %s);",
        (data.get('personID'), data.get('first_name'), data.get('last_name'), data.get('locationID'),
          data.get('taxID'), data.get('experience'), data.get('miles'), data.get('funds')),
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})

@app.route('/api/grant-or-revoke-pilot-license', methods=["POST"])
def grant_or_revoke_pilot_license():
    data = request.json or {}
    query(
        "CALL grant_or_revoke_pilot_license(%s, %s);",
        (data.get('personID'), data.get('license')),
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})
    
@app.route('/api/offer-flight', methods=["POST"])
def offer_flight():
    data = request.json or {}
    query(
        "CALL offer_flight(%s, %s, %s, %s, %s, %s, %s);",
        (data.get('flightID'), data.get('routeID'), data.get('support_airline'), data.get('support_tail'),
         data.get('progress'), data.get('next_time'), data.get('cost')),
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})
    
    
@app.route('/api/flight-landing', methods=["POST"])
def flight_landing():
    data = request.json or {}
    query(
        "CALL flight_landing(%s);",
        (data.get('flightID'),),
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})

@app.route('/api/flight-takeoff', methods=["POST"])
def flight_takeoff():
    data = request.json or {}
    query(
        "CALL flight_takeoff(%s);",
        (data.get('flightID'),),
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})

@app.route('/api/passengers-board', methods=["POST"])
def passengers_board():
    data = request.json or {}
    query(
        "CALL passengers_board(%s);",
        (data.get('flightID'),),
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})

@app.route('/api/passengers-disembark', methods=["POST"])
def passengers_disembark():
    data = request.json or {}
    query(
        "CALL passengers_disembark(%s);",
        (data.get('flightID'),),
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})

@app.route('/api/assign-pilot', methods=["POST"])
def assign_pilot():
    data = request.json or {}
    query(
        "CALL assign_pilot(%s, %s);",
        (data.get('flightID'), data.get('personID')),
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})

@app.route('/api/recycle-crew', methods=["POST"])
def recycle_crew():
    data = request.json or {}
    query(
        "CALL recycle_crew(%s);",
        (data.get('flightID'),),
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})

@app.route('/api/retire-flight', methods=["POST"])
def retire_flight():
    data = request.json or {}
    query(
        "CALL retire_flight(%s);",
        (data.get('flightID'),),
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})

@app.route('/api/simulation-cycle', methods=["POST"])
def simulation_cycle():
    query(
        "CALL simulation_cycle();",
        commit=True
    )
    return jsonify({'status' : 'completed bozo'})