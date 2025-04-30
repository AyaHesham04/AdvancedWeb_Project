import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';
import { createOrder } from '../../redux/slices/OrdersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartCheckout = ({ totalPrice }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [couponName, setCouponName] = useState('');
    const [finalPrice, setFinalPrice] = useState(totalPrice);
    const [discount, setDiscount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        street: '',
        apartment: '',
        floor: '',
        details: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFinalPrice(totalPrice);
    }, [totalPrice]);

    const onChangeCoupon = (value) => setCouponName(value);

    const handleSubmitCoupon = async () => {
        try {
            const { data } = await axios.post(`${APP_URL}/coupons/status`, { coupon: couponName });

            if (data.status === 'success') {
                setDiscount(data.discount);
                setFinalPrice(totalPrice - data.discount);
                Cookies.set('appliedCoupon', couponName);
                toast.success(`Coupon applied! You saved ${data.discount} EGP`, {
                    className: 'my-toast',
                });
            } else {
                throw new Error('Invalid coupon');
            }
        } catch {
            setCouponName('');
            setDiscount(0);
            setFinalPrice(totalPrice);
            Cookies.remove('appliedCoupon');
            toast.error('Invalid coupon. Try another one.');
        }
    };

    const handleClearCart = () => {
        Cookies.remove('cart');
        Cookies.remove('appliedCoupon');
        toast.info('Cart and coupon cleared');
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setShippingAddress({ name: '', phone: '', email: '', city: '', street: '', apartment: '', floor: '', details: '' });
        setErrors({});
    };

    const validateShipping = () => {
        const errs = {};
        const { name, phone, email, city, street, apartment, floor, details } = shippingAddress;

        if (!name.trim()) errs.name = 'Full Name is required';
        if (!phone.trim()) errs.phone = 'Phone is required';
        else if (!/^\+?[0-9]{7,15}$/.test(phone)) errs.phone = 'Enter a valid phone number';
        if (email && !/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Enter a valid email address';
        if (!city.trim()) errs.city = 'City is required';
        if (!street.trim()) errs.street = 'Street is required';
        if (!apartment.trim()) errs.apartment = 'Apartment is required';
        if (!floor.trim()) errs.floor = 'Floor is required';
        if (!details.trim()) errs.details = 'Details are required';

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (key, value) => {
        setShippingAddress(prev => ({ ...prev, [key]: value }));
        setErrors(prev => ({ ...prev, [key]: undefined }));
    };

    const handleSubmitShipping = () => {
        const cartItems = JSON.parse(Cookies.get('cart') || '[]');
        const coupon = couponName;

        if (cartItems.length === 0) {
            toast.warning('Cart is empty');
            return;
        }

        if (!validateShipping()) return;

        const orderData = {
            products: cartItems.map(({ productId, quantity }) => ({ id: productId, quantity })),
            shippingAddress,
            coupon,
        };

        dispatch(createOrder(orderData)).unwrap()
            .then(res => {
                navigate('/order-success', { state: res.data });
            })
            .catch(err => {
                toast.error(err.message || 'Failed to place order');
            });
        setShowModal(false);
    };

    const fields = [
        ['Full Name', 'name'],
        ['Phone', 'phone'],
        ['Email (optional)', 'email'],
        ['City', 'city'],
        ['Street', 'street'],
        ['Apartment', 'apartment'],
        ['Floor', 'floor'],
        ['Details', 'details'],
    ];

    return (
        <Row className="d-flex">
            <Col xs="12" className="d-flex flex-column pt-3 pb-3">
                <div className="d-flex pt-3 pb-3">
                    <input
                        value={couponName}
                        onChange={(e) => onChangeCoupon(e.target.value)}
                        className="copon-input d-inline text-center"
                        placeholder="Discount Code"
                    />
                    <button onClick={handleSubmitCoupon} className="copon-btn d-inline">Apply</button>
                </div>
                <div className="product-price d-inline w-100 my-3 border">
                    <strong>Total:</strong> {finalPrice} EGP
                    {discount > 0 && (
                        <div className="text-success">Discount applied: {discount} EGP</div>
                    )}
                </div>
                <button onClick={handleOpenModal} className="product-cart-add d-inline">Complete Purchase</button>
                <button onClick={handleClearCart} className="product-cart-add w-100 px-2 my-1">Clear Cart</button>
            </Col>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Shipping Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {fields.map(([label, key]) => (
                            <Col xs={12} sm={6} className="mb-3" key={key}>
                                <label className="form-label">{label}</label>
                                <input
                                    type={key === 'email' ? 'email' : 'text'}
                                    className={`form-control ${errors[key] ? 'is-invalid' : ''}`}
                                    value={shippingAddress[key]}
                                    onChange={e => handleChange(key, e.target.value)}
                                    placeholder={label}
                                />
                                {errors[key] && <div className="invalid-feedback">{errors[key]}</div>}
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="success" onClick={handleSubmitShipping}>Submit Order</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </Row>
    );
};

export default CartCheckout;