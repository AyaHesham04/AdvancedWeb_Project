import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllProducts from '../../Components/Admin/AdminAllProducts'
import Pagination from '../../Components/Uitily/Pagination'
import ViewProductAdminHook from './../../hook/admin/view-product-admin-hook';
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsPage } from './../../redux/actions/productsAction';

const AdminAllProductsPage = () => {
    const dispatch = useDispatch();
    const [items, pagination, onPress] = ViewProductAdminHook();
    if (pagination)
        var pageCount = pagination;
    else
        pageCount = 0;



    return (
        <Container fluid className="px-10">
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <AdminAllProducts products={items} />
                    {
                        pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={onPress} />) : null
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAllProductsPage
