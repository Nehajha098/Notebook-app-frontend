
import axios from "axios";
import { useState } from "react";
import "./signup.css";

function Signup() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
          const response = await axios.post(
            "http://localhost:8080/api/signup",
            {
              username,
              email,
              password
            }
          );
          console.log(response.data);
          alert(response.data);
        } catch(err) {
          console.log(err);
          alert("Sign up failed!");
        }
    }

  return (
    <div className="body2">
      <div className="left"></div>
      <div className="right">
        <div className="form">
        <h6>Welcome!</h6>
        <p>Join Us.</p>

        {/* 👇 FORM START */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className="form-label mt-3">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="form-text">
              Your password must be 8–15 characters long.
            </div>
          </div>

          {/* 👇 BUTTON MUST BE INSIDE FORM */}
          <button type="submit" className="signin">
            Create an Account
          </button>
        </form>

        <p>
          Already have an account? <a href="/">Sign in</a>
        </p>
      </div>
      </div>
    </div>
  );
}

export default Signup;
