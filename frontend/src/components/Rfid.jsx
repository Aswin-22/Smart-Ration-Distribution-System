import { useState } from "react";
import RfidList from "./RfidList";

function Rfid() {
  const [name, setName] = useState("");
  const [rfid, setRfid] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleRfidChange = (event) => {
    event.preventDefault();
    setRfid(event.target.value);
  };

  const handleWeightChange = (event) => {
    event.preventDefault();
    setWeight(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/rfid/addNew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rfid, name, weight }),
        mode: "cors",
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "RFID data not added");
      }
    } catch (err) {
      setError("Error: " + err);
      console.log(err);
    }
  };

  return (
    <div className="rfid-container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form >
        <div className="input-container">
          <label htmlFor="rfid">Rfid</label>
          <input
            type="text"
            id="rfid"
            name="rfid"
            onChange={handleRfidChange}
            value={rfid}
          />
        </div>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleNameChange}
            value={name}
          />
        </div>
        <div className="input-container">
          <label htmlFor="weight">weight</label>
          <input
            type="text"
            id="weight"
            name="weight"
            onChange={handleWeightChange}
            value={weight}
          />
        </div>
      </form>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <RfidList />
    </div>
  );
}

export default Rfid;
