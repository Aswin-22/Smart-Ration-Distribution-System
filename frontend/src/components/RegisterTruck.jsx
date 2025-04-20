import React from "react";

function RegisterTruck() {
  const [truckId, setTruckId] = React.useState("");
  const [driverName, setDriverName] = React.useState("");
  const [driverNumber, setDriverNumber] = React.useState("");
  const [startLatitude, setStartLatitude] = React.useState("");
  const [startLongitude, setStartLongitude] = React.useState("");
  const [endLatitude, setEndLatitude] = React.useState("");
  const [endLongitude, setEndLongitude] = React.useState("");
  const [error, setError] = React.useState("");

  const handleTruckId = (event) => {
    setTruckId(event.target.value);
  };
  const handleDriverName = (event) => {
    setDriverName(event.target.value);
  };
  const handleDriverNumber = (event) => {
    setDriverNumber(event.target.value);
  };
  const handleStartLatitude = (event) => {
    setStartLatitude(event.target.value);
  };
  const handleStartLongitude = (event) => {
    setStartLongitude(event.target.value);
  };
  const handleEndLatitude = (event) => {
    setEndLatitude(event.target.value);
  };
  const handleEndLongitude = (event) => {
    setEndLongitude(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/truck/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          truckId,
          driverName,
          driverNumber,
          startLocation: {
            latitude: startLatitude,
            longitude: startLongitude,
          },
          endLocation: {
            latitude: endLatitude,
            longitude: endLongitude,
          },
        }),
        credentials: "include",
        mode: "cors",
      });
      const data = await response.json();
      console.log(data);
      setTruckId("");
      setDriverName("");
      setDriverNumber("");
      setStartLatitude("");
      setStartLongitude("");
      setEndLatitude("");
      setEndLongitude("");
      if (!response.ok) {
        throw new Error(data.message || "Truck data not added");
      }
    } catch (err) {
      setError("Error: " + err);
      console.log(err);
    }
  };

  return (
    <div>
      <div className="truck-form-container">
        <h3>Add New Truck</h3>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} className="truck-form">
          <div className="truck-input-container">
            <label htmlFor="rfid">Truck Number</label>
            <input
              type="text"
              id="truckId"
              name="truckId"
              onChange={handleTruckId}
              value={truckId}
            />
          </div>
          <div className="truck-input-container">
            <label htmlFor="driverName">Driver Name</label>
            <input
              type="text"
              id="driverName"
              name="driverName"
              onChange={handleDriverName}
              value={driverName}
            />
          </div>
          <div className="truck-input-container">
            <label htmlFor="driverNumber">Driver Phone No</label>
            <input
              type="text"
              id="driverNumber"
              name="driverNumber"
              onChange={handleDriverNumber}
              value={driverNumber}
            />
          </div>
          <div className="truck-input-container-loc">
            <label htmlFor="startLatitude">Start Latitude</label>
            <input
              type="text"
              id="startLatitude"
              name="startLatitude"
              onChange={handleStartLatitude}
              value={startLatitude}
            />
            <label htmlFor="startLongitude">Start Longitude</label>
            <input
              type="text"
              id="startLongitude"
              name="startLongitude"
              onChange={handleStartLongitude}
              value={startLongitude}
            />
          </div>
          <div className="truck-input-container-loc">
            <label htmlFor="endLatitude">End Latitude</label>
            <input
              type="text"
              id="endLatitude"
              name="endLatitude"
              onChange={handleEndLatitude}
              value={endLatitude}
            />
            <label htmlFor="endLongitue">End Longitude</label>
            <input
              type="text"
              id="endLongitude"
              name="endLongitude"
              onChange={handleEndLongitude}
              value={endLongitude}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="small-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterTruck;
