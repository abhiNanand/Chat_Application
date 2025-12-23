import { Link } from "react-router";
export default function Login() {
  const Submit = () => {};
  return (
    <div className="authContainer">
      <h1>Signup</h1>
      <form onSubmit={Submit}>
        <div className="fillForm">
          <div className="labelsAndFields">
            <div className="labels">
              <label>Email</label> <label>Password</label>
            </div>
            <div className="fields">
              <input type="email" placeholder="Enter your email" />
              <input type="password" placeholder="Enter your password" />
            </div>
          </div>
          
          <div className="moveTo">
            <p>already have an account?</p>
            <Link to="/signup">Signup</Link>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
