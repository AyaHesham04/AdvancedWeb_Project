// src/components/CartCheckout.jsx
import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Modal,
    Button,
    Spinner
} from 'react-bootstrap';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';
import { createOrder } from '../../redux/slices/OrdersSlice';
import {
    fetchUser,
    addUserAddress
} from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartCheckout = ({ totalPrice, updateCartChange }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector((s) => s.auth);
    const user = auth.user?.data;
    const addingAddr = auth.addingAddress;

    const [couponName, setCouponName] = useState('');
    const [finalPrice, setFinalPrice] = useState(totalPrice);
    const [discount, setDiscount] = useState(0);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (showModal && !user) {
            dispatch(fetchUser());
        }
    }, [showModal, user, dispatch]);

    const [mode, setMode] = useState('select');

    const [selectedId, setSelectedId] = useState(null);

    const [newAddr, setNewAddr] = useState({
        alias: '',
        name: '',
        phone: '',
        email: '',
        city: '',
        details: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => setFinalPrice(totalPrice), [totalPrice]);
    const applyCoupon = async () => {
        try {
            const { data } = await axios.post(`${APP_URL}/coupons/status`, { coupon: couponName });
            if (data.status === 'success') {
                const origanal = totalPrice;
                let discount = data.discount;
                setDiscount(origanal - (origanal * discount) / 100);
                setFinalPrice((totalPrice * data.discount) / 100);
                Cookies.set('appliedCoupon', couponName);
                toast.success(`Coupon applied! You saved ${origanal - (origanal * discount) / 100} EGP`);
            } else throw new Error();
        } catch {
            setCouponName('');
            setDiscount(0);
            setFinalPrice(totalPrice);
            Cookies.remove('appliedCoupon');
            toast.error('Invalid coupon. Try another one.');
        }
    };

    const clearCart = () => {
        updateCartChange([]);
        Cookies.remove('cart');
        Cookies.remove('appliedCoupon');
        toast.info('Cart and coupon cleared');
    };

    const validateNew = () => {
        const errs = {};
        // which ones are required?
        const req = ['alias', 'name', 'phone', 'city', 'details'];
        req.forEach(k => {
            if (!newAddr[k]?.trim()) errs[k] = 'Required';
        });

        // phone format
        if (newAddr.phone && !/^\+?[0-9]{7,15}$/.test(newAddr.phone)) {
            errs.phone = 'Invalid phone';
        }

        // email only if provided
        if (newAddr.email && !/^\S+@\S+\.\S+$/.test(newAddr.email)) {
            errs.email = 'Invalid email';
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const placeOrder = async () => {
        const cartItems = JSON.parse(Cookies.get('cart') || '[]');
        if (!cartItems.length) {
            toast.warning('Cart is empty');
            return;
        }

        let shippingAddress;
        if (user && user.addresses?.length > 0 && mode === 'select') {
            const addr = user.addresses.find(a => a._id === selectedId);
            if (!addr) {
                toast.warn('Please select an address');
                return;
            }
            shippingAddress = addr;
        } else {
            if (!validateNew()) return;
            // try {
            //     await dispatch(addUserAddress(newAddr)).unwrap();
            //     toast.success('Address saved');
            //     await dispatch(fetchUser());
            // } catch (err) {
            //     toast.error(err.message || 'Failed to save address');
            //     return;
            // }
            shippingAddress = newAddr;
        }

        const orderData = {
            products: cartItems.map(({ productId, quantity }) => ({ id: productId, quantity })),
            shippingAddress,
            coupon: couponName || undefined
        };

        dispatch(createOrder(orderData)).unwrap()
            .then(res => navigate('/order-success', { state: res.data }))
            .catch(err => toast.error(err.message || 'Order failed'));

        setShowModal(false);
    };

    return (
        <>
            <Row className="d-flex">
                <Col xs="12" className="d-flex flex-column pt-3 pb-3">
                    <div className="d-flex">
                        <input
                            value={couponName}
                            onChange={e => setCouponName(e.target.value)}
                            className="copon-input"
                            placeholder="Discount Code"
                        />
                        <button onClick={applyCoupon} className="copon-btn">Apply</button>
                    </div>

                    <div className="product-price my-3 border p-2">
                        <strong>Total:</strong> {finalPrice} EGP
                        {discount > 0 && (
                            <div className="text-success">You saved: {discount} EGP</div>
                        )}
                    </div>

                    <button onClick={() => setShowModal(true)} className="product-cart-add">
                        Complete Purchase
                    </button>
                    <button onClick={clearCart} className="product-cart-add mt-2">
                        Clear Cart
                    </button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Choose Shipping Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {user && user.addresses?.length > 0 && mode === 'select' ? (
                        <>
                            <ul className="list-group">
                                {user.addresses.map(addr => (
                                    <li key={addr._id} className="list-group-item">
                                        <input
                                            type="radio"
                                            name="addr"
                                            value={addr._id}
                                            checked={selectedId === addr._id}
                                            onChange={() => setSelectedId(addr._id)}
                                            className="me-2"
                                        />
                                        <strong>{addr.alias}</strong> — {addr.details}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-3 d-flex justify-content-between">
                                <Button variant="outline-secondary" onClick={() => setMode('new')}>
                                    + Add New Address
                                </Button>
                                <Button
                                    variant="success"
                                    disabled={!selectedId}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Row>
                                {[
                                    ['Alias', 'alias'],
                                    ['Full Name', 'name'],
                                    ['Phone', 'phone'],
                                    ['Email (opt.)', 'email'],
                                    ['City', 'city'],
                                    ['Details', 'details']
                                ].map(([label, key]) => (
                                    <Col xs={12} sm={6} className="mb-3" key={key}>
                                        <label className="form-label">{label}</label>
                                        <input
                                            type={key === 'email' ? 'email' : 'text'}
                                            className={`form-control ${errors[key] ? 'is-invalid' : ''}`}
                                            value={newAddr[key] || ''}
                                            onChange={e => {
                                                setNewAddr(prev => ({ ...prev, [key]: e.target.value }));
                                                setErrors(prev => ({ ...prev, [key]: undefined }));
                                            }}
                                        />
                                        {errors[key] && <div className="invalid-feedback">{errors[key]}</div>}
                                    </Col>
                                ))}
                            </Row>
                            <div className="d-flex justify-content-between">
                                {user && user.addresses?.length > 0 && (
                                    <Button variant="outline-secondary" onClick={() => setMode('select')}>
                                        ← Select Existing
                                    </Button>
                                )}
                                <Button
                                    variant="success"
                                    disabled={addingAddr}
                                    onClick={placeOrder}
                                >
                                    {addingAddr
                                        ? <Spinner animation="border" size="sm" />
                                        : 'Save & Place Order'}
                                </Button>
                            </div>
                        </>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default CartCheckout;
