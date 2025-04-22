import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import SubTiltle from '../../Components/Uitily/SubTiltle';
import ProductCard from '../../Components/Products/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productsSlice';

const AllProductsPage = () => {

    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    return (
        <div style={{ minHeight: '100vh' }}>
            <Container>
                <SubTiltle title="All Products" />
                {
                    loading ? (
                        <Spinner animation="border" variant="primary" />
                    ) : error ? (
                        <h4>Error: {error}</h4>
                    ) : products.length > 0 ? (
                        <Row className='my-2 d-flex'>
                            {products.map((item) => (
                                <Col key={item._id} xs={12} sm={6} md={4}>
                                    <ProductCard item={item} />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <h4>No products Available</h4>
                    )
                }
            </Container>
        </div>
    )
}

export default AllProductsPage
