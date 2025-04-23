/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import CartItem from '../../Components/Cart/CartItem';
import { fetchCart } from '../../redux/slices/cartSlice';
import CartCheckout from '../../Components/Cart/CartCheckout';

const CartPage = () => {
    const dispatch = useDispatch();

    const {
        cartItems,
        loading,
        error,
    } = useSelector((state) => state.cart);
    useEffect(() => {
        console.log('cartItems:', cartItems);
    }, [cartItems]);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);
    const refreshCart = () => {
        dispatch(fetchCart());
    };
    if (loading) return <div style={{ minHeight: '100vh' }} className="text-center py-5">Loading...</div>;
    if (error) return <div style={{ minHeight: '100vh' }} className="text-danger text-center py-5">{error}</div>;

    return (
        <Container style={{ minHeight: '100vh' }} className="mb-5">
            <Row>
                <div className="cart-title my-4">Shopping Cart</div>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col xs="12" md="9" className="cart-body">
                    {cartItems?.cartItems ? (
                        cartItems.cartItems.map(
                            (item, index) =>
                                <>
                                    <CartItem key={index} item={item} refreshCart={refreshCart} />
                                    <hr />
                                </>)
                    ) : (
                        <h6>No products in the cart</h6>
                    )}
                </Col>
                <Col xs="10" md="3" className="cart-checkout">
                    <CartCheckout
                        cartItems={cartItems}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
