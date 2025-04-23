import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import useApplyCouponHook from './apply-coupon-hook';
import useClearCartHook from './clear-cart-hook';

const CartCheckout = () => {
    const [couponName, onChangeCoupon, handleSubmitCoupon] = useApplyCouponHook();
    const handleClearCart = useClearCartHook();

    const totalCartPrice = useSelector((state) => state.cart.totalCartPrice);
    const totalCartPriceAfterDiscount = useSelector((state) => state.cart.totalCartPriceAfterDiscount);

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
                    {
                        totalCartPriceAfterDiscount >= 1
                            ? `${totalCartPrice} EGP ... After Discount ${totalCartPriceAfterDiscount} `
                            : `${totalCartPrice} EGP`
                    }
                </div>

                <button className="product-cart-add d-inline"> Complete Purchase</button>

                <button onClick={handleClearCart} className="product-cart-add w-100 px-2 my-1"> Clear Cart</button>
            </Col>
            <ToastContainer />
        </Row>
    );
};

export default CartCheckout;
