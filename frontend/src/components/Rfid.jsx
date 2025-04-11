import { useState } from "react";
import { useSelector } from "react-redux";
import RfidList from "./RfidList";

function Rfid() {
  const [name, setName] = useState("");
  const [rfid, setRfid] = useState("");
  const [weight, setWeight] = useState("");
  const [searchRfid, setSearchRfid] = useState("");
  const [error, setError] = useState("");
  const userRole = useSelector((state) => state.auth.user?.role);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRfidChange = (event) => {
    setRfid(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleAddNew = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:3000/rfid/addNew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rfid, name, weight }),
        credentials: "include",
        mode: "cors",
      });
      const data = await response.json();
      console.log(data);
      setRfid("");
      setName("");
      setWeight("");
      if (!response.ok) {
        throw new Error(data.message || "RFID data not added");
      }
    } catch (err) {
      setError("Error: " + err);
      console.log(err);
    }
  };

  const handleUpdateLoadedAt = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `http://localhost:3000/rfid/update-loadtime/${searchRfid}`,
        {
          method: "PUT",
          credentials: "include",
          mode: "cors",
        }
      );
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format. Expected JSON.");
      }
      const data = await response.json();
      setSearchRfid("");
      if (!response.ok)
        throw new Error(data.message || "Failed to update loaded time");
      console.log("Loaded Time Updated:", data);
    } catch (err) {
      setError("Error: " + err);
      console.log(err);
    }
  };

  const handleUpdateUnloadedAt = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/rfid/update-unloadtime/${searchRfid}`,
        {
          method: "PUT",
          credentials: "include",
          mode: "cors",
        }
      );
      const data = await response.json();
      setSearchRfid("");
      if (!response.ok)
        throw new Error(data.message || "Failed to update unloaded time");
      console.log("Unloaded Time Updated:", data);
    } catch (err) {
      setError("Error: " + err);
      console.log(err);
    }
  };

  return (
    <div className="rfid-container">
      <h1>Rfid Management</h1>
      <div className="rfid-sub-container">
        {userRole === "LOADER" && (
          <>
            <div className="rfid-form">
              <h3>Add New Rfid</h3>
              <form onSubmit={handleAddNew}>
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
                <div className="button-container">
                  <button type="submit" className="small-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="rfid-form">
              <form onSubmit={handleUpdateLoadedAt}>
                <h3>Update Loaded Time</h3>
                <div className="input-container">
                  <label htmlFor="searchRfid">Search RFID</label>
                  <input
                    type="text"
                    id="searchRfid"
                    value={searchRfid}
                    onChange={(e) => setSearchRfid(e.target.value)}
                  />
                </div>
                <div className="button-container">
                  <button type="submit" className="small-btn">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
        {userRole === "UNLOADER" && (
          <div className="rfid-form">
            <form onSubmit={handleUpdateUnloadedAt}>
              <h3>Update Unloaded Time</h3>
              <div className="input-container">
                <label htmlFor="searchRfid">Search RFID</label>
                <input
                  type="text"
                  id="searchRfid"
                  value={searchRfid}
                  onChange={(e) => setSearchRfid(e.target.value)}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="small-btn">
                  Update
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <RfidList user={userRole}/>
    </div>
  );
}

export default Rfid;
