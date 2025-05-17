import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllProductsCard from '../../Components/Admin/AdminAllProductsCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productsSlice'
const AdminAllProductsPage = () => {

    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <div className="pt-3">
                        <div className='admin-content-text pb-2'>Manage All Products</div>
                        <Row className='justify-content-start'>
                            {loading ? (
                                <h6>Loading...</h6>
                            ) : error ? (
                                <h6>Error: {error}</h6>
                            ) : products?.length > 0 ? (
                                products.map((item, index) => (
                                    <AdminAllProductsCard key={index} item={item} />
                                ))
                            ) : (
                                <h6>No products available yet</h6>
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAllProductsPage
