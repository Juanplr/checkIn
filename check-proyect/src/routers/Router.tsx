import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import Inventario from "../pages/Inventario";
import Ajustes from "../pages/Ajustes";
import Usarios from "../pages/Usarios";


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
        path: "/inventario",
        element:(
            <ProtectedRoute>
                <Inventario />
            </ProtectedRoute>
        )
    },
    {
        path: "/ajustes",
        element: (
            <ProtectedRoute>
                <Ajustes />
            </ProtectedRoute>
        )
    },
    {
        path: "/usuarios",
        element: (
            <ProtectedRoute>
                <Usarios />
            </ProtectedRoute>
        )
    },
    {
        path: "*",
        element: <h1>Not Found</h1>
    },

]);
