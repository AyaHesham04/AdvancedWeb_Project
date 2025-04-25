import React from 'react'
import { Container, Row, Col, ToastContainer } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import { useParams } from 'react-router-dom';
const AdminEditCouponPage = () => {
    const { id } = useParams();
    const [couponName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit] = EditCouponHook(id);
    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">


                    <div>
                        <Row className="justify-content-start pt-3">
                            <div className="admin-content-text pb-4">Edit Coupon Details</div>
                            <Col sm="8">
                                <input
                                    value={couponName}
                                    onChange={onChangeName}
                                    type="text"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Coupon Name"
                                />
                                <input
                                    type="text"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Expiration Date"
                                    onChange={onChangeDate}
                                    value={couponDate}
                                />
                                <input
                                    value={couponValue}
                                    onChange={onChangeValue}
                                    type="number"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Coupon Discount Percentage"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="8" className="d-flex justify-content-end">
                                <button onClick={onSubmit} className="btn-save d-inline mt-2">Save Changes</button>
                            </Col>
                        </Row>

                        <ToastContainer />
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default AdminEditCouponPage