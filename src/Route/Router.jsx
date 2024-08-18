import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";

// import AllCard from "../Pages/All card/AllCard";
import Register from "../Auth/Register";
import LogIn from "../Auth/Login";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import MyAddedProduct from "../Components/HomeData/MyAddedProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <LogIn />,
            },

            {
                path: "/home",
                element: <PrivateRoute><Home /></PrivateRoute>,
            },
            {
                path: '/myProduct',
                element: <PrivateRoute><MyAddedProduct></MyAddedProduct></PrivateRoute>,
                
            },
            {
                path: "/register",
                element: <Register />,
            }
        ]
    },
]);

export default router;