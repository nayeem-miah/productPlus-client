import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
import LoadingSpinner from "../Components/LoadingSpinner";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user) {
        return children;
    }
    return <Navigate to='/' state={location.pathname} replace={true}></Navigate>
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node,
}