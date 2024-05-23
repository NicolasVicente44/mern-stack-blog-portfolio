import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (ev) => {
    ev.preventDefault();

    // Client-side validation
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        // Handle successful login
        console.log(data);
        setRedirect(true);
      } else {
        // Handle login error
        alert("Invalid Credentials");
        console.error("Login failed:", data);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("An error occurred:", error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={login} className="login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        autoComplete="current-password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
