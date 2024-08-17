import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";

// import AllCard from "../Pages/All card/AllCard";
import Register from "../Auth/Register";
import LogIn from "../Auth/Login";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <LogIn />,
            },
            // {
            //     path: "/allCard",
            //     element: <PrivateRoute><AllCard/></PrivateRoute>,
            //     loader: ()=> fetch("http://localhost:5000/productsCount")
            // },
            {
                path: "/home",
                element: <PrivateRoute><Home /></PrivateRoute>,
            },
            {
                path: "/register",
                element: <Register />,
            }
        ]
    },
]);

export default router;