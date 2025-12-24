import "./auth.css";
import { Link } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const Submit = async (e) => {
    e.preventDefault(); // page ko reload honey se rukta hai, q ki form submit honey pr page ko reload kr deta hai
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/account/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // true hota hai jab HTTP status code 200–299 ke beech ho
      // false hota hai jab status code error ho
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="authContainer">
      <h1>Signup</h1>

      <form onSubmit={Submit}>
        <div className="fillForm">
          <div className="labelsAndFields">
            <div className="labels">
              <label>Name</label>
              <label>Email</label>
              <label>Password</label>
            </div>

            <div className="fields">
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="moveTo">
            <p>already have an account? </p>
            <Link to="/login">Login</Link>
          </div>

          <button type="submit" className="btn">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}
