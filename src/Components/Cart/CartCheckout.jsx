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
        details: '',
        city: '',
        phone: '',
        name: '',
        apartment: '',
        floor: '',
        street: '',
        email: '',
    });

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
        Cookies.remove('cartItems');
        Cookies.remove('appliedCoupon');
        toast.info('Cart and coupon cleared');
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmitShipping = () => {
        const cartItems = JSON.parse(Cookies.get('cart') || '[]');
        const coupon = couponName;
        debugger;
        if (cartItems.length === 0) {
            toast.warning('Cart is empty');
            return;
        }

        const orderData = {
            products: cartItems.map(({ productId, quantity }) => ({ id: productId, quantity })),
            shippingAddress,
            coupon
        };

        dispatch(createOrder(orderData)).unwrap()
            .then(res => {
                navigate('/order-success', { state: res.data });
            })
            .catch(err => {
                toast.error(err || 'Failed to place order');
            });;
        setShowModal(false);

    };

    return (
        <Row className="d-flex">
            <Col xs="12" className="d-flex flex-column pt-3 pb-3">
                <div className="d-flex">
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
                        {[
                            ['Full Name', 'name'],
                            ['Phone', 'phone'],
                            ['Email', 'email'],
                            ['City', 'city'],
                            ['Street', 'street'],
                            ['Apartment', 'apartment'],
                            ['Floor', 'floor'],
                            ['Details', 'details'],
                        ].map(([label, key]) => (
                            <Col xs={12} sm={6} className="mb-3" key={key}>
                                <label className="form-label">{label}</label>
                                <input
                                    className="form-control"
                                    value={shippingAddress[key]}
                                    onChange={(e) =>
                                        setShippingAddress({ ...shippingAddress, [key]: e.target.value })
                                    }
                                    placeholder={label}
                                />
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
