import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authAction";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("LOADER");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await dispatch(registerUser(name, email, password, role));
    if (success) navigate("/user/login");
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleEmailChange}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handlePassChange}
          value={password}
        />
        <label htmlFor="role">Role</label>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="LOADER">LOADER</option>
          <option value="UNLOADER">UNLOADER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
