import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';

const ProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token || token === "undefined") {
                    setIsAuthorized(false);
                    setIsLoading(false);
                    return;
                }

                const res = await axios.get(`${APP_URL}/users/getMe`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const name = res.data?.data?.name;
                localStorage.setItem('name', name);

                if (res.data.data.role === 'admin') {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                setIsAuthorized(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (isLoading) return <div style={{ minHeight: '100vh' }} className="p-10">Loading...</div>;

    return isAuthorized ? (children ? children : <Outlet />) : <Navigate to="/" />;
};

export default ProtectedRoute;
