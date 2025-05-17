import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import UserSideBar from '../../Components/User/UserSideBar'
import UserAllOrderItem from './UserAllOrderItem'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminOrders } from '../../redux/slices/ordersSlice'
const UserAllOrdersPage = () => {
    const [loading, setLoading] = useState(true);
    const [results, setResult] = useState(0);
    const [paginate, setPaginate] = useState({});
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('user'))
    let userName = ''
    if (user != null)
        userName = user.name

    const get = async () => {
        setLoading(true)
        await dispatch(fetchAdminOrders());

        setLoading(false)
    }

    useEffect(() => {
        get()
    }, [])

    const resAllOrder = useSelector(state => state.orders)
    useEffect(() => {
        if (loading === false) {
            setOrderData(resAllOrder.orders.data)
        }
    }, [loading])

    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <UserSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <div>
                        <div className="admin-content-text pt-4">Total Orders: #{orderData.length}</div>
                        <Row className='justify-content-between'>
                            {
                                orderData.length >= 1 ? (
                                    orderData.map((orderItem, index) => {
                                        return <UserAllOrderItem key={index} orderItem={orderItem} />
                                    })
                                ) : <h6>No orders yet</h6>
                            }
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}


export default UserAllOrdersPage
