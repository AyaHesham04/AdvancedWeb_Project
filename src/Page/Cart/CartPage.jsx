/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import CartItem from '../../Components/Cart/CartItem';
import CartCheckout from '../../Components/Cart/CartCheckout';
import Cookies from 'js-cookie';
import APP_URL from '../../Api/baseURL';
import axios from 'axios';
const CartPage = () => {
    const { product, loading, error } = useSelector((state) => state.products);

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const cookieCart = Cookies.get('cart');

            if (cookieCart) {
                const ids = JSON.parse(cookieCart);
                console.log("id", ids);
                if (Array.isArray(ids) && ids[0] != null) {
                    try {
                        const products = await Promise.all(
                            ids.map(async (id) => {
                                const res = await axios.get(`${APP_URL}/products/${id.productId}`);
                                return {
                                    ...res.data.data,
                                    quantity: id.quantity,
                                };
                            })
                        );
                        setCartItems(products);
                    } catch (err) {
                        console.error("Error fetching cart items", err);
                    }
                }
            }
        };

        fetchCartItems();
    }, []);
    const onQuantityChange = (productId, quantity) => {
        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);
        const minimalCart = updatedCart.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        Cookies.set('cart', JSON.stringify(minimalCart), { expires: 7 });
    };
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log("total ", totalPrice);
    if (loading) return <div style={{ minHeight: '100vh' }} className="text-center py-5">Loading...</div>;
    if (error) return <div style={{ minHeight: '100vh' }} className="text-danger text-center py-5">{error}</div>;

    return (
        <Container style={{ minHeight: '100vh' }} className="mb-5">
            <Row>
                <div className="cart-title my-4">Shopping Cart</div>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col xs="12" md="8" lg="8" className="cart-body">
                    {cartItems ? (
                        cartItems.map(
                            (item, index) =>
                                <>
                                    <CartItem key={index} item={item} onQuantityChange={onQuantityChange} />
                                    <hr />
                                </>)
                    ) : (
                        <h6>No products in the cart</h6>
                    )}
                </Col>
                <Col xs="10" md="3" className="cart-checkout">
                    <CartCheckout
                        totalPrice={totalPrice}
                        cartItems={cartItems}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
