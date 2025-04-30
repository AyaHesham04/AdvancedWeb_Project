import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ToastContainer } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleCoupon, updateCoupon } from '../../redux/slices/couponSlice';

const AdminEditCouponPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentCoupon, loading } = useSelector((state) => state.coupon);

    const [couponName, setCouponName] = useState('');
    const [couponDate, setCouponDate] = useState('');
    const [couponValue, setCouponValue] = useState('');

    const onChangeName = (e) => setCouponName(e.target.value);
    const onChangeDate = (e) => setCouponDate(e.target.value);
    const onChangeValue = (e) => setCouponValue(e.target.value);

    useEffect(() => {
        dispatch(fetchSingleCoupon(id));
    }, [dispatch, id]);

    useEffect(() => {
        console.log(currentCoupon);
        if (currentCoupon) {
            setCouponName(currentCoupon.data.name);
            const formattedDate = new Date(currentCoupon.data.expire).toISOString().split('T')[0];
            setCouponDate(formattedDate);
            setCouponValue(currentCoupon.data.discount);
        }
    }, [currentCoupon]);

    const onSubmit = async () => {
        await dispatch(updateCoupon({
            id,
            name: couponName,
            expire: couponDate,
            discount: couponValue,
        }));
    };

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
                                    type="date"
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
    );
}

export default AdminEditCouponPage;
