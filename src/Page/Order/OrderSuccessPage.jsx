// src/pages/OrderSuccessPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, Table, Button
} from 'react-bootstrap';
import dayjs from 'dayjs';

const OrderSuccessPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state || !state.order) {
        navigate('/', { replace: true });
        return null;
    }

    const {
        order,
        totalBeforeDiscount,
        totalAfterDiscount,
        coupon
    } = state;

    return (
        <Container className="py-5">
            <h2 className="text-center mb-4">Thank You for Your Order!</h2>

            <Row>
                {/* Left column: summary & items */}
                <Col lg={8} className="mb-4">
                    <Card className="shadow-sm mb-4">
                        <Card.Header>Order Summary</Card.Header>
                        <Card.Body>
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p>
                                <strong>Date:</strong>{' '}
                                {dayjs(order.createdAt).format('DD MMM YYYY, HH:mm')}
                            </p>
                            <p>
                                <strong>Payment Method:</strong>{' '}
                                {order.paymentMethodType === 'cash' ? 'Cash' : 'Credit Card'}
                            </p>
                            <p>
                                <strong>Status:</strong>{' '}
                                {order.isDelivered ? 'Delivered' : 'Pending'}
                            </p>
                        </Card.Body>
                    </Card>

                    <Card className="shadow-sm">
                        <Card.Header>Items</Card.Header>
                        <Card.Body className="p-0">
                            <Table responsive hover className="mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Product</th>
                                        <th className="text-center">Qty</th>
                                        <th className="text-end">Price</th>
                                        <th className="text-end">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.cartItems.map(item => (
                                        <tr key={item._id}>
                                            <td>{item.productName || item.product}</td>
                                            <td className="text-center">{item.quantity}</td>
                                            <td className="text-end">{item.price} EGP</td>
                                            <td className="text-end">
                                                {item.price * item.quantity} EGP
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right column: shipping & totals */}
                <Col lg={4}>
                    <Card className="shadow-sm mb-4">
                        <Card.Header>Shipping Address</Card.Header>
                        <Card.Body>
                            <p><strong>{order.shippingAddress.name}</strong></p>
                            <p>{order.shippingAddress.details}</p>
                            <p>
                                {order.shippingAddress.street}, Apt {order.shippingAddress.apartment},<br />
                                Floor {order.shippingAddress.floor}, {order.shippingAddress.city}
                            </p>
                            <p>{order.shippingAddress.phone}</p>
                            {order.shippingAddress.email && <p>{order.shippingAddress.email}</p>}
                        </Card.Body>
                    </Card>

                    <Card className="shadow-sm">
                        <Card.Header>Totals</Card.Header>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col>Total Before Discount:</Col>
                                <Col className="text-end">{totalBeforeDiscount} EGP</Col>
                            </Row>
                            {coupon && (
                                <Row className="mb-2">
                                    <Col>Coupon ({coupon.name}):</Col>
                                    <Col className="text-end">- {coupon.discount} EGP</Col>
                                </Row>
                            )}
                            <Row className="fw-bold">
                                <Col>Total After Discount:</Col>
                                <Col className="text-end">{totalAfterDiscount} EGP</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div className="text-center mt-4">
                <Button variant="primary" onClick={() => navigate('/')}>
                    Continue Shopping
                </Button>
            </div>
        </Container>
    );
};

export default OrderSuccessPage;
