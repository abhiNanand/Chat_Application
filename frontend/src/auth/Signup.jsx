import "./auth.css";
import {Link} from 'react-router';

export default function Signup() {
  const Submit = () => {};
  return (
    <div className="authContainer">
      <h1>Signup</h1>

      <form onSubmit={Submit}>
        <div className="fillForm">
          <div>
            <label>Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
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
