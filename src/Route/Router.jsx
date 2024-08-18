import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";

// import AllCard from "../Pages/All card/AllCard";
import Register from "../Auth/Register";

import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import MyAddedProduct from "../Components/HomeData/MyAddedProduct";
import ErrorPages from "./ErrorPage";
import LogIn from "../Auth/LogIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPages></ErrorPages>,
        children: [
            {
                index: true,
                element: <LogIn />,
            },

            {
                path: "/home",
                element: <Home />,
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