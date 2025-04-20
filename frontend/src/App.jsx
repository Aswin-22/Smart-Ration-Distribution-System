import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/authSlice";
import {
  Home,
  Login,
  Signup,
  Rfid,
  Notfound,
  Nav,
  ProtectedRoute,
  Dashboard,
  RegisterTruck,
} from "./components";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "LOADER", "UNLOADER"]} />
          }
        >
          <Route path="/rfid" element={<Rfid />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["LOADER"]} />}>
          <Route path="/register-truck" element={<RegisterTruck />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
