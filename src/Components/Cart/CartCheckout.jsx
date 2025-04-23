import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';

const CartCheckout = ({ totalPrice }) => {
    const [couponName, setCouponName] = useState('');
    const [finalPrice, setFinalPrice] = useState(totalPrice);
    const [discount, setDiscount] = useState(0);
    console.log(finalPrice, totalPrice);
    useEffect(
        () => {
            setFinalPrice(totalPrice);
        }, [totalPrice]);
    const vibrateDevice = () => {
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
    };

    const onChangeCoupon = (value) => {
        setCouponName(value);
    };

    const handleSubmitCoupon = async () => {
        try {
            const { data } = await axios.post(`${APP_URL}/coupons/status`, { coupon: couponName });

            if (data.status === 'success') {
                setDiscount(data.discount);
                const updatedPrice = totalPrice - data.discount;
                setFinalPrice(updatedPrice);
                Cookies.set('appliedCoupon', couponName);
                toast.success(`Coupon applied! You saved ${data.discount} EGP`);
            } else {
                throw new Error('Invalid coupon');
            }
        } catch (err) {
            vibrateDevice();
            setCouponName('');
            setDiscount(0);
            setFinalPrice(totalPrice);
            Cookies.remove('appliedCoupon');
            toast.error('Invalid coupon. Try another one.');
        }
    };

    const handleClearCart = () => {
        // Your logic to clear cart here
        toast.info('Cart cleared');
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
                <button className="product-cart-add d-inline"> Complete Purchase</button>

                <button onClick={handleClearCart} className="product-cart-add w-100 px-2 my-1"> Clear Cart</button>
            </Col>
            <ToastContainer />
        </Row>
    );
};

export default CartCheckout;
