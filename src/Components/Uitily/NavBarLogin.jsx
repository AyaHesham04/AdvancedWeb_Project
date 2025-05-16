/* eslint-disable react/prop-types */
// src/components/NavBarLogin.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Container, FormControl, Nav, NavDropdown, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logOut as logOutAction } from '../../redux/slices/authSlice';
import { setSearchQuery } from '../../redux/slices/searchSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'
import { fetchCategories } from '../../redux/slices/categorySlice';


function NavBarLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.category);
    const items = useSelector((state) => state.cart.items);
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const dropdownRef = useRef(null);

    const user = useSelector((state) => state.auth.user);
    const [word, setWord] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);


    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
                setShowCategoriesDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const onLogOut = () => {
        dispatch(logOutAction());
        navigate('/login');
    };

    const handleInputChange = (e) => setWord(e.target.value);
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const q = word.trim();
            if (!q) return;
            dispatch(setSearchQuery(q));
            navigate(`/search?q=${encodeURIComponent(q)}`);
        }
    };

    const handleCategoriesDropdownToggle = () => {
        setShowCategoriesDropdown((prev) => !prev);
        setShowDropdown(false);
    };

    const handleUserDropdownToggle = () => {
        setShowDropdown((prev) => !prev);
        setShowCategoriesDropdown(false);
    };


    return (
        <Navbar className="sticky-top w-full navbar-custom" style={{ backgroundColor: '#efc4c3' }} variant="dark" expand="sm">
            <Container>
                <Navbar.Brand>
                    <a href='/'>
                        <img src={logo} alt="logo" width="50" height="50" />
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <input
                        type="search"
                        value={word}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search..."
                        className="searchBar"
                        aria-label="Search"
                    />
                    <Nav className="ms-auto d-flex position-relative" ref={dropdownRef}>
                        <NavDropdown
                            show={showCategoriesDropdown}
                            onClick={handleCategoriesDropdownToggle}
                            title="Categories"
                            id="categories-nav-dropdown"
                            className="d-flex w-100 justify-content-center me-2"
                        >
                            {categoriesLoading ? (
                                <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
                            ) : categoriesError ? (
                                <NavDropdown.Item disabled>Error loading categories</NavDropdown.Item>
                            ) : categories.length === 0 ? (
                                <NavDropdown.Item disabled>No categories available</NavDropdown.Item>
                            ) : (
                                categories.map((category) => (
                                    <NavDropdown.Item
                                        key={category._id}
                                        href={`/products/category/${category._id}`}
                                        className=""
                                        onClick={() => setShowCategoriesDropdown(false)}
                                    >
                                        {category.name}
                                    </NavDropdown.Item>
                                ))
                            )}
                        </NavDropdown>
                        {user ? (
                            <NavDropdown
                                show={showDropdown}
                                onClick={handleUserDropdownToggle}
                                title={user.data.name}
                                id="basic-nav-dropdown"
                                className="d-flex w-100 justify-content-center text-capitalize"
                            >
                                {
                                    user.data.role === "admin" ? (
                                        <NavDropdown.Item href="/admin" className="">Dashboard</NavDropdown.Item>)
                                        : (<NavDropdown.Item href="/user/profile" className="">Profile</NavDropdown.Item>)
                                }
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={onLogOut} href="/" className="">Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link href='/login'
                                className="d-flex justify-content-center">
                                <svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#f9f6f6" className="me-2 dropdown-toggle">
                                    <path d="M0 0h48v48H0z" fill="none" />
                                    <g id="Shopicon">
                                        <path d="M31.278,25.525C34.144,23.332,36,19.887,36,16c0-6.627-5.373-12-12-12c-6.627,0-12,5.373-12,12
                                        c0,3.887,1.856,7.332,4.722,9.525C9.84,28.531,5,35.665,5,44h38C43,35.665,38.16,28.531,31.278,25.525z M16,16c0-4.411,3.589-8,8-8
                                        s8,3.589,8,8c0,4.411-3.589,8-8,8S16,20.411,16,16z M24,28c6.977,0,12.856,5.107,14.525,12H9.475C11.144,33.107,17.023,28,24,28z"
                                            stroke="#f9f6f6"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        />
                                    </g>
                                </svg>
                                <p className="nav-text">Login</p>
                            </Nav.Link>
                        )}

                        <Nav.Link href='/cart'
                            className="d-flex nav-cart justify-content-center position-relative">
                            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2 dropdown-toggle">
                                <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#f9f6f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span style={{ color: '#b0787b' }} className="position-absolute translate-middle badge rounded-pill bg-white ms-1">
                                {cartCount || 0}
                            </span>
                            <p className="nav-text">Cart</p>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavBarLogin;
