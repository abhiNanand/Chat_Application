import { Link,Navigate,useNavigate } from "react-router";
import {useState} from "react";
import { toast } from "react-toastify";


export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const Submit = async(e) => {
    e.preventDefault();
    try{
      const res= await fetch(`${import.meta.env.VITE_API_URL}/account/login`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({email,password}),
      });
      const data =await res.json();
      if(!res.ok){
        throw new Error(data.message || "Login Failed");
      }
      toast.success(`welcome ${data.name}`);
      setTimeout(()=>navigate('/'),1600);
    }
    catch(error){
      toast.error(error.message);
    }
    finally{
      setEmail('');
      setPassword('');
    }

  };
  return (
    <div className="authContainer">
      <h1>Login</h1>
      <form onSubmit={Submit}>
        <div className="fillForm">
          <div className="labelsAndFields">
            <div className="labels">
              <label>Email</label> <label>Password</label>
            </div>
            <div className="fields">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
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
