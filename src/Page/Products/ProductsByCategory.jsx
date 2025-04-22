import React, { useEffect } from 'react';
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../redux/slices/productsSlice';

import SubTiltle from '../../Components/Uitily/SubTiltle';
import ProductCard from '../../Components/Products/ProductCard';

const ProductsByCategory = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products);
    console.log(products);
    useEffect(() => {
        if (id) dispatch(fetchProductsByCategory(id));
    }, [dispatch, id]);

    return (
        <div style={{ minHeight: '100vh' }}>
            <Container>
                <Row className="d-flex flex-row">
                    <Col sm="12">
                        <Container>
                            {products && (
                                <SubTiltle title={products.length > 0 ? products[0].category.name : "category"} />
                            )}
                            {loading ? (
                                <Spinner animation="border" />
                            ) : error ? (
                                <h4 className="text-danger">{error}</h4>
                            ) : products.length === 0 ? (
                                <h4>No  products yet.</h4>
                            ) : (

                                <Row className='my-2 d-flex'>
                                    {products.map(item => (
                                        <Col key={item._id} xs={12} sm={6} md={4}>
                                            <ProductCard item={item} />
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductsByCategory;
