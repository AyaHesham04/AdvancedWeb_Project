import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const AdminSideBar = () => {

    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="d-flex py-3">
                <Link to="/admin" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin' ? 'active-sidebar-item' : ''}`}>
                        Analytics
                    </div>
                </Link>
                <Link to="/admin/all_orders" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/all_orders' ? 'active-sidebar-item' : ''}`}>
                        Manage Orders
                    </div>
                </Link>
                <Link to="/admin/all_products" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/all_products' ? 'active-sidebar-item' : ''}`}>
                        Manage Products
                    </div>
                </Link>
                <Link to="/admin/all_categories" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/allcategories' ? 'active-sidebar-item' : ''}`}>
                        Manage Categories
                    </div>
                </Link>
                <Link to="/admin/add/product" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/add/product' ? 'active-sidebar-item' : ''}`}>
                        Add Product
                    </div>
                </Link>
                <Link to="/admin/add/category" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/add/category' ? 'active-sidebar-item' : ''}`}>
                        Add Category
                    </div>
                </Link>


                <Link to="/admin/add/coupon" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/add/coupon' ? 'active-sidebar-item' : ''}`}>
                        Manage Coupons
                    </div>
                </Link>
                <Link to="/admin/slider" style={{ textDecoration: 'none' }} className='m-2'>
                    <div className={`admin-side-text border-bottom p-2 mx-auto text-center ${location.pathname === '/admin/slider' ? 'active-sidebar-item' : ''}`}>
                        Manage Slider
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default AdminSideBar
