import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const AdminSideBar = () => {

    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="d-flex py-3">
                <Link to="/admin/allorders" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/allorders' ? 'active-sidebar-item' : ''}`}>
                        Manage Orders
                    </div>
                </Link>
                <Link to="/admin/allproducts" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/allproducts' ? 'active-sidebar-item' : ''}`}>
                        Manage Products
                    </div>
                </Link>
                <Link to="/admin/allcategories" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/allcategories' ? 'active-sidebar-item' : ''}`}>
                        Manage Categories
                    </div>
                </Link>
                <Link to="/admin/addcategory" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/addcategory' ? 'active-sidebar-item' : ''}`}>
                        Add Category
                    </div>
                </Link>
                <Link to="/admin/addproduct" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/addproduct' ? 'active-sidebar-item' : ''}`}>
                        Add Product
                    </div>
                </Link>
                <Link to="/admin/addcoupon" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/addcoupon' ? 'active-sidebar-item' : ''}`}>
                        Manage Coupons
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default AdminSideBar
