from flask import Flask, jsonify
from flask_cors import CORS
import serial
import pynmea2
import time
import RPi.GPIO as GPIO
from hx711 import HX711

app = Flask(__name__)
CORS(app)

GPS_PORT = "/dev/serial0"
GPS_BAUDRATE = 9600
gps_serial = serial.Serial(GPS_PORT, GPS_BAUDRATE, timeout=1)

DT_PIN = 5
SCK_PIN = 6
hx = HX711(DT_PIN, SCK_PIN)
hx.set_reading_format("MSB", "MSB")
hx.set_reference_unit(92)
hx.reset()
hx.tare()

def get_gps_data():
    while True:
        line = gps_serial.readline().decode("utf-8", errors="ignore")
        if line.startswith("$GPGGA"):
            msg = pynmea2.parse(line)
            return {"latitude": msg.latitude, "longitude": msg.longitude}

def get_weight():
    weight = hx.get_weight(5)
    hx.power_down()
    hx.power_up()
    return round(weight, 2)

@app.route('/data', methods=['GET'])
def get_sensor_data():
    gps_data = get_gps_data()
    weight = get_weight()
    
    response = {
        "gps": gps_data,
        "weight": weight
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

#program for sending data to server

# import requests
# run ipconfig in cmd to get the ip address of your computer
# ip address will be in the format 192.168.x.x
# url = 'http://192.168.x.x:3000/api/update-location'
# data = {truckID: "Sameasindatabase", currentLocation: {"latitude": 0, "longitude": 0}, weight: 0}
# response = requests.put(url, json=data)
# print(response.text)

