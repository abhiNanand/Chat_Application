import { createBrowserRouter } from "react-router";
import Home from "../Components/Home";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  { path: "/login", element: <Login/> },
  { path: "/signup", element: <Signup /> },
]);

export default router;
