/* eslint-disable react/prop-types */
// src/components/NavBarLogin.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logOut as logOutAction } from '../../redux/slices/authSlice';
import { setSearchQuery } from '../../redux/slices/searchSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'

function NavBarLogin({ itemsNum }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const user = useSelector((state) => state.auth.user);

    const [word, setWord] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
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

    return (
        <nav
            className="navbar sticky-top navbar-expand-sm fixed-height-navbar navbar-custom"
            style={{ backgroundColor: '#efc4c3' }}
        >
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="logo" width="50" height="50" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <input
                        type="search"
                        value={word}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search..."
                        className="form-control m-2 w-auto"
                        aria-label="Search"
                        style={{
                            fontSize: '14px',
                            borderRadius: '30px',
                            border: '1px solid #b0787b',
                            padding: '0.5rem 1rem',
                            maxWidth: '100%',
                            backgroundColor: '#f9f6f6',
                            color: '#b0787b',
                            height: '30px',
                        }}
                    />

                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        {user ? (
                            <li className="nav-item dropdown" ref={dropdownRef}>
                                <button
                                    className="nav-link dropdown-toggle btn btn-link"
                                    onClick={() => setShowDropdown((s) => !s)}
                                    aria-expanded={showDropdown}
                                >
                                    {user.name}
                                </button>
                                <ul
                                    className={`dropdown-menu ${showDropdown ? 'show' : ''}`}
                                    aria-labelledby="userDropdown"
                                >
                                    {user.role === 'admin' ? (
                                        <li>
                                            <a className="dropdown-item" href="/admin/allproducts">
                                                Dashboard
                                            </a>
                                        </li>
                                    ) : (
                                        <li>
                                            <a className="dropdown-item" href="/user/profile">
                                                Profile
                                            </a>
                                        </li>
                                    )}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item" onClick={onLogOut}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item d-flex">
                                <a className="nav-link" href="/login">Login</a>
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                        )}

                        <li className="nav-item">
                            <a
                                className="nav-link position-relative"
                                href="/cart"
                            >
                                <svg
                                    width="22px"
                                    height="22px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="me-2"
                                >
                                    <path
                                        d="M6.3 5h14.7l-2 7H6l-3-7zM9 20a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"
                                        stroke="#f9f6f6"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                {itemsNum > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-dark">
                                        {itemsNum}
                                    </span>
                                )}
                                <span className="visually-hidden">Cart</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBarLogin;
