import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Pagination from '../../Components/Uitily/Pagination'
import UserAllAddress from '../../Components/User/UserAllAddress'
import UserSideBar from '../../Components/User/UserSideBar'
const UserAllAddresPage = () => {
    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <UserSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <UserAllAddress />
                </Col>
            </Row>
        </Container>
    )
}

export default UserAllAddresPage
