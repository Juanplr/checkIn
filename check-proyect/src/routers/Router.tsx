import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import BarCode from "../components/barCode";



export const router = createBrowserRouter([

    {
        path: "/",
        element: <App />
    },

    {
        path: "/login",
        element: (
            <ProtectedRoute>
                <Login />
            </ProtectedRoute>
        )

    },
    {
        path: "/scaner",
        element: <BarCode />
    },
    {
        path: "*",
        element: <h1>Not Found</h1>
    },

]);
