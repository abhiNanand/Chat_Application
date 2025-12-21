import { use } from "react";
import {useNavigate} from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="header">
        <button onClick={()=>navigate("/login")}>Login</button>
        <button onClick={()=>navigate("/signup")}>Signup</button>
      </div>
      <div className="list">
        <h1>Chats</h1>
      </div>
      <div className="chatbox">
        <h1>Chatapp for windows</h1>
        <p>Send and receive message easily</p>
      </div>
    </div>
  );
}
