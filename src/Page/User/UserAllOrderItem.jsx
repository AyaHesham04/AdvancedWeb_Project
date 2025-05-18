import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import UserAllOrderCard from './UserAllOrderCard'


const UserAllOrderItem = ({ orderItem }) => {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <Col sm="12" className="mb-3">
            <div className="order-details-body-admin my-2 d-flex p-4">
                <div className="w-100">
                    <Row className="mb-2">
                        <Col>
                            <div className="d-inline card-price">
                                Order No. #{orderItem._id || 0} - Placed on {formatDate(orderItem.createdAt)}
                            </div>
                        </Col>
                        <Col xs="auto">
                            <h5 className="card-price fw-bold"><span className="mr-2">Total Order Fees:</span>{orderItem.totalAfterDiscount || 0} EGP</h5>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        {orderItem.cartItems ? (
                            orderItem.cartItems.map((item, index) => (
                                <div key={orderItem._id}>
                                    <Row className="d-flex mb-2">
                                        <Col xs="3" md="2" className="d-flex justify-content-start">
                                            <Link to={`/products/${item.product?._id}`} style={{ textDecoration: 'none' }}>
                                                <img width="100px" height="120px" src={item.product?.imageCover} alt="productImage" />
                                            </Link>
                                        </Col>
                                        <Col xs="8" md="6">
                                            <div className="d-inline pt-2 stat">
                                                {item.product?.title || ''}
                                            </div>
                                            <div className="d-flex">
                                                <div className="order-name d-inline">Quantity:</div>
                                                <div className="d-inline pt-2 stat">
                                                    {item.quantity || ''}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                        ) : null}
                    </Row>
                    <Row className="gy-2">
                        <Col md="4">
                            <div className="fw-semibold d-inline stat">Delivery Status:</div>
                            <div className={orderItem.isDelivered ? "text-success" : "text-danger"}>
                                {orderItem.isDelivered ? 'Delivered' : 'Not Delivered'}
                            </div>
                        </Col>
                        {/* <Col md="4">
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
                        </Col> */}
                    </Row>
                </div>
            </div>
        </Col>
    )
}

export default UserAllOrderItem
