import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminAddCoupon from '../../Components/Admin/AdminAddCoupon'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
const AdminAddCouponPage = () => {
    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <AdminAddCoupon />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAddCouponPage