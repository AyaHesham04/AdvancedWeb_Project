import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrders } from '../../redux/slices/ordersSlice';


const AdminAllOrdersPage = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchAdminOrders());
    }, [dispatch]);
    console.log(orders);
    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <div className="pt-3">
                        <div className='admin-content-text pb-3'>Manage All Orders</div>
                        <Row className='justify-content-start'>
                            {loading ? (
                                <h6>Loading...</h6>
                            ) : error ? (
                                <h6 className="text-danger">{error}</h6>
                            ) : orders?.data ? (
                                orders.data.map((orderItem) => (
                                    <Col sm="12" className="mb-3" key={orderItem._id}>
                                        <Link to={`/admin/orders/${orderItem._id}`} className="cart-item-body-admin mt-2 mb-4 d-flex p-4" style={{ textDecoration: "none" }}>
                                            <div className="w-100">
                                                <Row className="mb-2">
                                                    <Col>
                                                        <div className="d-inline card-price">Order # {orderItem._id}</div>
                                                    </Col>
                                                    <Col xs="auto">
                                                        <h5 className="card-price fw-bold"><span className="mr-2">Total Order Fees:</span>{orderItem.totalOrderPrice || 0} EGP</h5>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <div className="fw-semibold order-name">Order from: <span className="text-dark">{orderItem.shippingAddress?.phone || ''}</span></div>
                                                        <div className="text-muted small">{orderItem.user?.email || ''}</div>
                                                    </Col>
                                                </Row>
                                                <Row className="gy-2">
                                                    <Col md="4">
                                                        <div className="fw-semibold d-inline stat">Delivery Status:</div>
                                                        <div className={orderItem.isDelivered ? "text-success" : "text-danger"}>
                                                            {orderItem.isDelivered ? 'Delivered' : 'Not Delivered'}
                                                        </div>
                                                    </Col>
                                                    <Col md="4">
                                                        <div className="fw-semibold d-inline stat">Payment Status:</div>
                                                        <div className={orderItem.isPaid ? "text-success" : "text-danger"}>
                                                            {orderItem.isPaid ? 'Paid' : 'Not Paid'}
                                                        </div>
                                                    </Col>
                                                    <Col md="4">
                                                        <div className="fw-semibold d-inline stat">Payment Method:</div>
                                                        <div className="text-dark">
                                                            {orderItem.paymentMethodType === 'cash' ? 'Cash' : 'Credit Card'}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Link>
                                    </Col>
                                ))
                            ) : (
                                <h6>No orders available yet</h6>
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminAllOrdersPage;
