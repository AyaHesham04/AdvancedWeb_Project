/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import CartItem from '../../Components/Cart/CartItem';
import { fetchCart } from '../../redux/slices/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();

    const {
        cartItems,
        totalCartPrice,
        totalCartPriceAfterDiscount,
        couponNameRes,
        loading,
        error,
    } = useSelector((state) => state.cart);
    debugger;
    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (error) return <div className="text-danger text-center py-5">{error}</div>;

    return (
        <Container style={{ minHeight: '670px' }}>
            <Row>
                <div className="cart-title mt-4">Shopping Cart</div>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col xs="12" md="9">
                    {cartItems.cartItems ? (
                        cartItems.cartItems.map((item, index) => <CartItem key={index} item={item} />)
                    ) : (
                        <h6>No products in the cart</h6>
                    )}
                </Col>
                <Col xs="6" md="3">
                    {/* <CartCheckout
                        cartItems={cartItems}
                        couponNameRes={couponNameRes}
                        totalCartPriceAfterDiscount={totalCartPriceAfterDiscount}
                        totalCartPrice={totalCartPrice}
                    /> */}
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
