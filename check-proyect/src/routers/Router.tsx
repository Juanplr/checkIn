import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import App from "../App";



export const router = createBrowserRouter([

    {
        path: "/",
        element: <App />
    },

    {
        path: "/login",
        element: <Login />

    },
    {
        path: "*",
        element: <h1>Not Found</h1>
    },

]);
