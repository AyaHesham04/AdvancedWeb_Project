/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import CartItem from '../../Components/Cart/CartItem';
import CartCheckout from '../../Components/Cart/CartCheckout';
import APP_URL from '../../Api/baseURL';
import axios from 'axios';
import { setCart } from '../../redux/slices/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItemsRaw = useSelector((state) => state.cart.items);
    const { loading, error } = useSelector((state) => state.products);

    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        if (Array.isArray(cartItemsRaw) && cartItemsRaw.length > 0) {
            try {
                const products = await Promise.all(
                    cartItemsRaw.map(async (cartItem) => {
                        const res = await axios.get(`${APP_URL}/products/${cartItem.productId}`);
                        return {
                            ...res.data.data,
                            quantity: cartItem.quantity,
                        };
                    })
                );
                setCartItems(products);
            } catch (err) {
                console.error("Error fetching cart items", err);
            }
        } else {
            setCartItems([]);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [cartItemsRaw]);

    const onQuantityChange = (productId, quantity) => {
        console.log("mini : ");

        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);

        const minimalCart = updatedCart.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));
        console.log("mini : ", minimalCart);

        dispatch(setCart(minimalCart));
    };
    const updateCartChange = (updatedMinimalCart) => {
        dispatch(setCart(updatedMinimalCart));
    };
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (loading) return <div style={{ minHeight: '100vh' }} className="text-center py-5">Loading...</div>;
    if (error) return <div style={{ minHeight: '100vh' }} className="text-danger text-center py-5">{error}</div>;

    return (
        <Container style={{ minHeight: '100vh' }} className="mb-5">
            <Row>
                <div className="cart-title my-4">Shopping Cart</div>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col xs="12" md="8" lg="8" className="cart-body">
                    {cartItems.length > 0 ? (
                        cartItems.map(
                            (item, index) => (
                                <div key={index}>
                                    <CartItem item={item} onQuantityChange={onQuantityChange} updateCartChange={updateCartChange} />
                                    <hr />
                                </div>
                            )
                        )
                    ) : (
                        <h6>No products in the cart</h6>
                    )}
                </Col>
                <Col xs="10" md="3" className="cart-checkout">
                    <CartCheckout
                        totalPrice={totalPrice}
                        cartItems={cartItems}
                        updateCartChange={updateCartChange}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
