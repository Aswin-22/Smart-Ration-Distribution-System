import { loginSuccess, logout } from "./authSlice";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const text = await response.text();
    if (!text) throw new Error("Empty response from server");

    const data = JSON.parse(text);

    if (response.status !== 200 && response.status !== 201)
      throw new Error(data.message || "Login failed");

    dispatch(loginSuccess(data));
  } catch (error) {
    console.error(error.message);
    alert("Login Failed: " + error.message);
  }
};

export const registerUser = (name, email, password, role) => async () => {
  try {
    const response = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
      credentials: "include",
    });

    const text = await response.text();
    if (!text) throw new Error("Empty response from server");

    const data = JSON.parse(text);

    if (!response.ok) throw new Error(data.message || "Signup failed");

    alert("Signup successful, please login!");
    return true;
  } catch (error) {
    console.error(error.message);
    alert("Signup Failed: " + error.message);
    return false;
  }
};

export const logoutUser = () => async (dispatch) => {
  await fetch("http://localhost:3000/user/logout", {
    method: "POST",
    credentials: "include",
  });
  dispatch(logout());
};
