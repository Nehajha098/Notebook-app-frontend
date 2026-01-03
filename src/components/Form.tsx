import axios from "axios";
import "./form.css";
import { useState } from "react";

function Form() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/signin",
        {
          email,
          password
        }
      );
      console.log(response.data);
      alert(response.data);
    }catch(err) {
      console.log(err);
    }

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="body">
      <div className="form">
        <h6>Welcome!</h6>
        <p>Login to continue.</p>

        {/* 👇 FORM START */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
            Sign in
          </button>
        </form>

        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Form;
