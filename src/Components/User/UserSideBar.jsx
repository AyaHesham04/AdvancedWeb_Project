import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const UserSideBar = () => {

    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="d-flex py-3">
                <Link to="/user/profile" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/user/profile' ? 'active-sidebar-item' : ''}`}>
                        Profile
                    </div>
                </Link>
                <Link to="/user/addresses" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/user/addresses' ? 'active-sidebar-item' : ''}`}>
                        Personal Addresses
                    </div>
                </Link>
                <Link to="/user/allorders" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/user/allorders' ? 'active-sidebar-item' : ''}`}>
                        Manage Orders
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default UserSideBar;
