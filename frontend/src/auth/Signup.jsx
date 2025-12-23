import "./auth.css";
import { Link } from "react-router";

export default function Signup() {
  const Submit = () => {};
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
            <input type="text" placeholder="Enter your name" />
            <input type="email" placeholder="Enter your email" />
            <input type="password" placeholder="Enter your password" />
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
