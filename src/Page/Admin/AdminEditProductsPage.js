import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminEditProducts from '../../Components/Admin/AdminEditProducts';
const AdminEditProductsPage = () => {
    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <AdminEditProducts />
                </Col>
            </Row>
        </Container>
    )
}
export default AdminEditProductsPage