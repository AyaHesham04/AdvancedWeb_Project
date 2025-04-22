import React, { useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SubTiltle from '../Uitily/SubTiltle';
import ProductCard from './ProductCard';
import { fetchProducts } from '../../redux/slices/productsSlice';

const CardProductsContainerHome = ({ title, btntitle, pathText }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts(4));
  }, [dispatch]);

  return (
    <Container>
      {products.length > 0 && (
        <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
      )}

      <Row className='my-2 d-flex'>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : error ? (
          <h5>{error}</h5>
        ) : (
          products.map((item, index) => (
            <Col key={index} xs={12} md={3}>
              <ProductCard item={item} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default CardProductsContainerHome;
