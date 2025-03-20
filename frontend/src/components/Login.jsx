import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authAction";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginUser(email, password));
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Email</label>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
