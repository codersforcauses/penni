import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LocalBaseURL } from "@/lib/api";

const LOGIN_URL = LocalBaseURL.concat("/app/login/");

const TestPostRequestPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        username,
        password,
      });
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);
      console.log("token", token);
      console.log("Login successful, token stored.");
      // Redirect or update UI to show the user is logged in
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  const handleTestRegisterRequest = () => {
    axios
      .post("http://localhost:8000/api/app/register/", {
        email: "user123@example.com",
        password: "user123abc!@#",
        username: "user123",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Test POST Request</h1>
      <Button onClick={handleTestRegisterRequest}>Register</Button>

      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              className="border border-2"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              className="border border-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default TestPostRequestPage;
