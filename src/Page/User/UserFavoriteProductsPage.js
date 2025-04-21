import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllProducts from '../../Components/Admin/AdminAllProducts'
import Pagination from '../../Components/Uitily/Pagination'
import AdminOrderDetalis from '../../Components/Admin/AdminOrderDetalis'
import UserSideBar from '../../Components/User/UserSideBar'
import UserAllOrder from '../../Components/User/UserAllOrder'
import UserFavoriteProduct from '../../Components/User/UserFavoriteProduct'
import { useNavigate } from 'react-router-dom';
const UserFavoriteProductsPage = () => {
   
    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <UserSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <UserFavoriteProduct />
                </Col>
            </Row>
        </Container>
    )
}

export default UserFavoriteProductsPage
