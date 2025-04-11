import React, { useEffect, useState } from "react";
import axios from "axios";

const TruckTable = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Truck Statuses</h2>
      {loading ? (
        <p>Loading truck data...</p>
      ) : trucks.length === 0 ? (
        <p>No truck data available.</p>
      ) : (
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
              <th style={thStyle}>Latitude</th>
              <th style={thStyle}>Longitude</th>
              <th style={thStyle}>Weight (kg)</th>
              <th style={thStyle}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {trucks.map((truck, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{truck.truckId}</td>
                <td style={tdStyle}>{truck.location.latitude}</td>
                <td style={tdStyle}>{truck.location.longitude}</td>
                <td style={tdStyle}>{truck.weight}</td>
                <td style={tdStyle}>
                  {new Date(truck.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f0f0f0",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left",
};

export default TruckTable;
