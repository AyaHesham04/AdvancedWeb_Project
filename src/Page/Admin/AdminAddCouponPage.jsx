import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, ToastContainer } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminCouponCard from '../../Components/Admin/AdminCouponCard'
import { useDispatch, useSelector } from 'react-redux'
import { createCoupon, fetchCoupons, selectCoupons } from '../../redux/slices/couponSlice'
const AdminAddCouponPage = () => {
    const dispatch = useDispatch();
    const coupons = useSelector(selectCoupons);

    useEffect(() => {
        dispatch(fetchCoupons());
    }, [dispatch]);
    const [coupnName, setCouponName] = useState('');
    const [couponDate, setCouponDate] = useState('');
    const [couponValue, setCouponValue] = useState('');
    const dateRef = useRef();


    const onChangeName = (e) => setCouponName(e.target.value);
    const onChangeDate = (e) => setCouponDate(e.target.value);
    const onChangeValue = (e) => setCouponValue(e.target.value);

    const onSubmit = () => {
        if (!coupnName || !couponDate || !couponValue) {
            return toast.error("All fields are required");
        }
        dispatch(createCoupon({
            name: coupnName,
            expire: couponDate,
            discount: couponValue
        }));
    };
    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <div className="pt-3">
                        <Row className="justify-content-start">
                            <div className="admin-content-text pb-4">Add New Coupon</div>
                            <Col sm="8">
                                <input
                                    value={coupnName}
                                    onChange={onChangeName}
                                    type="text"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Coupon Name"
                                />
                                <input
                                    ref={dateRef}
                                    type="text"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Expiration Date"
                                    onChange={onChangeDate}
                                    value={couponDate}
                                    onFocus={() => (dateRef.current.type = "date")}
                                    onBlur={() => (dateRef.current.type = "text")}
                                />
                                <input
                                    value={couponValue}
                                    onChange={onChangeValue}
                                    type="number"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Discount Percentage"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="8" className="d-flex justify-content-end">
                                <button onClick={onSubmit} className="btn-save d-inline mt-2">Save Coupon</button>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="8">
                                {coupons?.data ? (
                                    coupons.data.map((item, index) => <AdminCouponCard key={index} coupon={item} />)
                                ) : (
                                    <h6>No coupons available yet</h6>
                                )}
                            </Col>
                        </Row>

                        <ToastContainer />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAddCouponPage