import "./App.css";
import router from "./routes/router";
import { RouterProvider } from "react-router";
import {ToastContainer} from "react-toastify";

export default function App() {
  return (<>
   <RouterProvider router={router}></RouterProvider>
    <ToastContainer autoClose={1500} limit={5} />
  </>
   
  );
}