import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboad from "../features/chat/pages/dashboad";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboad />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
])