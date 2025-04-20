import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMap } from "react-leaflet";

const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 13); // move map to new position
  }, [position, map]);

  return null;
};

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const TruckTable = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTruck, setSelectedTruck] = useState(null);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.get("/api/truck/data");
        if (Array.isArray(response.data)) {
          setTrucks(response.data);
        } else {
          console.error("Expected array, got:", response.data);
          setTrucks([]);
        }
      } catch (error) {
        console.error("Error fetching truck data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrucks();
  }, []);

  const handleTruckClick = (truck) => {
    if (truck.currentLocation) {
      setSelectedTruck(truck);
    } else {
      alert("Truck is unloaded, no location available.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Truck Statuses</h2>
      {loading ? (
        <p>Loading truck data...</p>
      ) : trucks.length === 0 ? (
        <p>No truck data available.</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Truck ID</th>
                <th style={thStyle}>Driver Name</th>
                <th style={thStyle}>Latitude</th>
                <th style={thStyle}>Longitude</th>
                <th style={thStyle}>Weight (kg)</th>
                <th style={thStyle}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((truck, idx) => (
                <tr key={idx}>
                  <td
                    style={{ ...tdStyle, cursor: "pointer", color: "blue" }}
                    onClick={() => handleTruckClick(truck)}
                  >
                    {truck.truckId}
                  </td>
                  <td style={tdStyle}>{truck.driverName || "N/A"}</td>
                  <td style={tdStyle}>
                    {truck.currentLocation
                      ? truck.currentLocation.latitude
                      : "Unloaded"}
                  </td>
                  <td style={tdStyle}>
                    {truck.currentLocation
                      ? truck.currentLocation.longitude
                      : "Unloaded"}
                  </td>
                  <td style={tdStyle}>{truck.weight || "N/A"}</td>
                  <td style={tdStyle}>
                    {truck.timestamp
                      ? new Date(truck.timestamp).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Map section */}
          {selectedTruck && (
            <div style={{ marginTop: "20px", height: "400px" }}>
              <h3>Location of Truck: {selectedTruck.truckId}</h3>
              <MapContainer
                center={[
                  selectedTruck.currentLocation.latitude,
                  selectedTruck.currentLocation.longitude,
                ]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                key={selectedTruck.truckId} // optional: helps force reload if needed
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                />
                <MapUpdater
                  position={[
                    selectedTruck.currentLocation.latitude,
                    selectedTruck.currentLocation.longitude,
                  ]}
                />
                <Marker
                  position={[
                    selectedTruck.currentLocation.latitude,
                    selectedTruck.currentLocation.longitude,
                  ]}
                >
                  <Popup>
                    Truck: {selectedTruck.truckId} <br />
                    Driver: {selectedTruck.driverName}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left",
};

export default TruckTable;
