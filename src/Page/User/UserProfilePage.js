import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Pagination from '../../Components/Uitily/Pagination'
import UserSideBar from '../../Components/User/UserSideBar'
import UserAddAddress from '../../Components/User/UserAddAddress';
import UserProfile from '../../Components/User/UserProfile';
const UserProfilePage = () => {
    return (
        <Container fluid className="px-10" style={{ height: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <UserSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <UserProfile />
                </Col>
            </Row>
        </Container>
    )
}
export default UserProfilePage
