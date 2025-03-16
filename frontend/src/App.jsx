import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Rfid, Notfound, Nav } from "./components";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/rfid/addNew" element={<Rfid />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
