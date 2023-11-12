import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { getToken } from "../API/auth.js";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        console.log("Please Fill out both fields");
        return;
      } else {
        nav("/home");
      }
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <div className="login">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="login-input">
          <label>Username: </label>
          <input
            placeholder="username..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            type="text"
          />
        </div>
        <br></br>
        <div className="login-input">
          <label>Password:</label>
          <input
            placeholder="password..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
          />
        </div>
        <button className="login-button">Submit</button>
      </form>
    </div>
  );
}
