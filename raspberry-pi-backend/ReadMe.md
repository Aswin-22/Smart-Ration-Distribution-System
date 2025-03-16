# Raspberry Pi Backend for GPS & Strain Gauge Data Collection

This project sets up a Flask server on a Raspberry Pi to collect and serve data from a GPS module and a strain gauge using an HX711 ADC module.

## 🛠 Requirements

- Raspberry Pi (any model with GPIO support)
- GPS module (connected via UART)
- Strain Gauge with HX711 ADC module
- Python 3 installed on Raspberry Pi

## 📦 Installation

Follow these steps to install and run the application on your Raspberry Pi.

### 1️⃣ Clone the Repository

Run the following command on your Raspberry Pi terminal:

```bash
git clone https://github.com/Aswin-22/Smart-Ration-Distribution-System.git
cd raspberry-pi-backend
```

### 2️⃣ Install requirements

Run the following command on your Raspberry Pi terminal:

```bash
pip install -r requirements.txt
```

### 3️⃣ Run Application

Run the following command on your Raspberry Pi terminal:

```bash
python app.py
```
