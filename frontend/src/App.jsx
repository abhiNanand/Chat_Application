import "./App.css";
import router from "./routes/router";
import { RouterProvider } from "react-router";

export default function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}