import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ToastContainer } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import { Link, useParams } from 'react-router-dom'
import { fetchOrderById, updateOrderDelivery } from '../../redux/slices/ordersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

const AdminOrderDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { selectedOrder: orderData, loading, error } = useSelector((state) => state.orders);
    const [deliverStatus, setDeliverStatus] = useState('');
    console.log(orderData);
    useEffect(() => {
        if (id) {
            dispatch(fetchOrderById(id));
        }
    }, [dispatch, id]);
    console.log(orderData ? orderData.data.isDelivered ? "false" : "true" : "false");
    const onChangePaid = () => { };
    const changePayOrder = () => { };

    const onChangeDeliver = (e) => {
        setDeliverStatus(e.target.value);
    };
    const changeDeliverOrder = async () => {
        if (deliverStatus === '') {
            toast.error('Please select a delivery status first.');
            return;
        }

        try {
            console.log({ id, isDelivered: deliverStatus === "true" });
            await dispatch(updateOrderDelivery(id)).unwrap();
            await dispatch(fetchOrderById(id)).unwrap();
            toast.success('Delivery status updated successfully!');
        } catch (error) {
            toast.error('Failed to update delivery: ' + error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <div>

                        <Col sm="12" className="mb-3">
                            <div className="order-details-body-admin my-2 d-flex p-4">
                                <div className="w-100">
                                    <Row className="mb-2">
                                        <Col>
                                            <div className="d-inline card-price">
                                                Order No. #{orderData ? orderData.data._id || 0 : " "} - Placed on {formatDate(orderData ? orderData.data.createdAt : " ")}
                                            </div>
                                        </Col>
                                        <Col xs="auto">
                                            <h5 className="card-price fw-bold"><span className="mr-2">Total Order Fees:</span>{orderData ? orderData.data.totalAfterDiscount || orderData.data.totalOrderPrice : " "} EGP</h5>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        {orderData ?
                                            (
                                                orderData.data.cartItems.map((item, index) => (
                                                    <>
                                                        <div>
                                                            <Row className="d-flex mb-2">
                                                                <Col xs="3" md="2" className="d-flex justify-content-start">
                                                                    <Link to={`/products/${item.product?._id}`} style={{ textDecoration: 'none' }}>
                                                                        <img width="150px" height="120px" src={item.product?.imageCover} alt="productImage" />
                                                                    </Link>
                                                                </Col>
                                                                <Col xs="8" md="6">
                                                                    <div className="d-inline pt-2 stat">
                                                                        {item.product?.title || ''}
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        <div className="order-name d-inline">Quantity: {item.quantity || ''}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </>
                                                )
                                                )
                                            )
                                            : null}
                                    </Row>
                                    <Row className="gy-2">
                                        <Col md="4">
                                            <div className="fw-semibold d-inline stat">Delivery Status:</div>
                                            <div className={orderData ? orderData.data.isDelivered ? "text-success" : "text-danger" : " "}>
                                                {orderData ? orderData.data.isDelivered ? 'Delivered' : 'Not Delivered' : " "}
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="fw-semibold d-inline stat">Payment Status:</div>
                                            <div className={orderData ? orderData.data.isPaid ? "text-success" : "text-danger" : ""}>
                                                {orderData ? orderData.data.isPaid ? 'Paid' : 'Not Paid' : " "}
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="fw-semibold d-inline stat">Payment Method:</div>
                                            <div className="text-dark">
                                                {orderData ? orderData.data.paymentMethodType === 'cash' ? 'Cash' : 'Credit Card' : " "}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>

                        <Col sm="12">
                            <div className="order-details-body-admin my-2 d-flex p-4">
                                <div className="w-100">
                                    <Row className="justify-content-center">
                                        <Col xs="12" className=" d-flex">
                                            <div className="admin-content-text py-2">Customer Details</div>
                                        </Col>
                                        <Col xs="12" className="d-flex">
                                            <div
                                                style={{
                                                    color: "#555550",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}>
                                                Name:
                                            </div>

                                            <div
                                                style={{
                                                    color: "#979797",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}
                                                className="mx-2">
                                                {orderData ? orderData.data.shippingAddress.name ?? "NAN" : 'NAN'}
                                            </div>
                                        </Col>

                                        <Col xs="12" className="d-flex">
                                            <div
                                                style={{
                                                    color: "#555550",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}>
                                                Phone Number:
                                            </div>

                                            <div
                                                style={{
                                                    color: "#979797",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}
                                                className="mx-2">
                                                {orderData ? orderData.data.shippingAddress?.phone : ''}
                                            </div>
                                        </Col>
                                        <Col xs="12" className="d-flex">
                                            <div
                                                style={{
                                                    color: "#555550",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}>
                                                Email:
                                            </div>

                                            <div
                                                style={{
                                                    color: "#979797",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}
                                                className="mx-2">
                                                {orderData ? orderData.data.shippingAddress.email ?? 'NAN' : ''}
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col xs="12" className=" d-flex">
                                            <div className="admin-content-text py-2">Shipping Address
                                                Details</div>
                                        </Col>
                                        <Col xs="12" className="d-flex">
                                            <div
                                                style={{
                                                    color: "#555550",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}>
                                                City:
                                            </div>

                                            <div
                                                style={{
                                                    color: "#979797",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}
                                                className="mx-2">
                                                {orderData ? orderData.data.shippingAddress.city ?? "NAN" : 'NAN'}
                                            </div>
                                        </Col>

                                        <Col xs="12" className="d-flex">
                                            <div
                                                style={{
                                                    color: "#555550",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}>
                                                Details:
                                            </div>

                                            <div
                                                style={{
                                                    color: "#979797",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}
                                                className="mx-2">
                                                {orderData ? orderData.data.shippingAddress?.details : ''}
                                            </div>
                                        </Col>
                                        <Col xs="12" className="d-flex">
                                            {/* <div
                                                style={{
                                                    color: "#555550",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}>
                                                Street:
                                            </div>

                                            <div
                                                style={{
                                                    color: "#979797",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}
                                                className="mx-2">
                                                {orderData ? orderData.data.shippingAddress.street ?? 'NAN' : ''}
                                            </div> */}
                                        </Col>
                                        {/* <Col xs="12" className="d-flex">
                                            <div
                                                style={{
                                                    color: "#555550",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}>
                                                Floor:
                                            </div>

                                            <div
                                                style={{
                                                    color: "#979797",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}
                                                className="mx-2">
                                                {orderData ? orderData.data.shippingAddress.floor ?? 'NAN' : ''}
                                            </div>
                                        </Col> */}
                                        {/* <Col xs="12" className="d-flex">
                                            <div
                                                style={{
                                                    color: "#555550",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}>
                                                Apartment:
                                            </div>

                                            <div
                                                style={{
                                                    color: "#979797",
                                                    fontFamily: "Almarai",
                                                    fontSize: "16px",
                                                }}
                                                className="mx-2">
                                                {orderData ? orderData.data.shippingAddress.apartment ?? 'NAN' : ''}
                                            </div>
                                        </Col> */}
                                        <div className="d-flex mt-2 justify-content-center flex-column flex-md-row">
                                            <div>
                                                <select
                                                    onChange={onChangeDeliver}
                                                    name="deliver"
                                                    id="deliver"
                                                    className="select input-form-area mt-1 text-center w-50"
                                                >
                                                    <option disabled selected value="">Delivery</option>
                                                    <option value="true">Completed</option>
                                                    <option value="false">Not Completed</option>
                                                </select>
                                                <button onClick={changeDeliverOrder} className="btn-a px-2 d-inline mx-1">
                                                    Save
                                                </button>
                                            </div>
                                        </div>

                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <ToastContainer />
                    </div>
                </Col >
            </Row >
        </Container >
    )
}

export default AdminOrderDetailsPage
