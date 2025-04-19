import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllOrders from '../../Components/Admin/AdminAllOrders'
import Pagination from '../../Components/Uitily/Pagination'
const AdminAllOrdersPage = () => {
    return (
        <Container fluid className="px-10">
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <AdminAllOrders />
                </Col>
            </Row>
        </Container>
    )
}
export default AdminAllOrdersPage

