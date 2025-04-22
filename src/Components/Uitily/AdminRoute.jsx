import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { fetchUser } from '../../redux/slices/authSlice';

const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    const location = useLocation(); // Get current route

    useEffect(() => {
        // Only dispatch fetchUser if user is null and not already loading
        if (user === null && !loading) {
            dispatch(fetchUser());
        }
    }, [dispatch, user, loading]);

    // Show loading state while fetching user
    if (loading || user === null) {
        return <div>Loading...</div>;
    }

    // After fetchUser completes, check user and role
    if (!user) {
        // Redirect to login, preserving the intended route
        return <Navigate to="/login" state={{ from: location }} />;
    }


    // If authenticated and on a non-admin route, redirect to /admin
    if (user.data.role == 'admin') {
        return <Navigate to="/admin/all_orders" />;
    }

    // If authenticated and authorized, render the protected route
    return <Outlet />;
};

export default ProtectedRoute;