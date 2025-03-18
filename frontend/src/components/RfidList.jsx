import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function RfidList() {
  const [rfids, setRfids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/rfid/getAll")
      .then((response) => response.json())
      .then((data) => setRfids(data))
      .catch((err) => setError(err.message));

    socket.on("newRfid", (newRfid) => {
      setRfids((prevRfids) => [...prevRfids, newRfid]);
    });

    return () => socket.off("newRfid");
  }, []);

  return (
    <div className="rfid-list-container">
      <h2>RFID Data (Real-Time)</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>RFID</th>
            <th>Name</th>
            <th>Weight (kg)</th>
            <th>Loaded At</th>
          </tr>
        </thead>
        <tbody>
          {rfids.map((rfid) => (
            <tr key={rfid._id}>
              <td>{rfid.rfid}</td>
              <td>{rfid.name}</td>
              <td>{rfid.weight} kg</td>
              <td>
                {new Date(rfid.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RfidList;
