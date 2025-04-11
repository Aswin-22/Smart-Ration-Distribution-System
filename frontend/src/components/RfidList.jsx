import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function RfidList({ user }) {
  const [rfids, setRfids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initial fetch to get all RFIDs
    fetch("http://localhost:3000/rfid/getAll", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 Important to send JWT stored in cookies
    })
      .then((response) => response.json())
      .then((data) => setRfids(data))
      .catch((err) => setError(err.message));

    socket.on("newRfid", (newRfid) => {
      setRfids((prevRfids) => [...prevRfids, newRfid]);
    });

    socket.on("updateLoadedAt", (updatedRfid) => {
      setRfids((prev) =>
        prev.map((rfid) =>
          rfid.rfid === updatedRfid.rfid ? updatedRfid : rfid
        )
      );
    });

    socket.on("updateUnLoadedAt", (updatedRfid) => {
      setRfids((prev) =>
        prev.map((rfid) =>
          rfid.rfid === updatedRfid.rfid ? updatedRfid : rfid
        )
      );
    });

    return () => {
      socket.off("newRfid");
      socket.off("updateLoadedAt");
      socket.off("updateUnLoadedAt");
    };
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
            {(user == "LOADER"|| user == "ADMIN") && (<th>Arrived At</th>)}
            {(user == "LOADER"|| user == "ADMIN") && (<th>Loaded At</th>)}
            {(user == "UNLOADER"|| user == "ADMIN") && (<th>Unloaded At</th>)}
          </tr>
        </thead>
        <tbody>
          {rfids.map((rfid) => (
            <tr key={rfid._id}>
              <td>{rfid.rfid}</td>
              <td>{rfid.name}</td>
              <td>{rfid.weight} kg</td>
              {(user == "LOADER" || user == "ADMIN" ) && (
                <td>{formatDate(rfid.arrivedAt)}</td>
              )}
              {(user == "LOADER"|| user == "ADMIN") && (
                <td>{rfid.loadedAt ? formatDate(rfid.loadedAt) : "Pending"}</td>
              )}
              {(user == "UNLOADER"|| user == "ADMIN") && (
                <td>
                  {rfid.unLoadedAt ? formatDate(rfid.unLoadedAt) : "Pending"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export default RfidList;
