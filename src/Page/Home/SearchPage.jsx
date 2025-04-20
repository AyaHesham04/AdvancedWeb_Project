import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { clearSearch, fetchSearchResults } from '../../redux/slices/searchSlice';
import ProductCard from '../../Components/Products/ProductCard';


const useQuery = () => new URLSearchParams(useLocation().search);

const SearchPage = () => {
    const dispatch = useDispatch();
    const q = useQuery().get('q') || '';
    const { results, loading, error } = useSelector(state => state.search);

    useEffect(() => {
        if (q) {
            dispatch(fetchSearchResults(q));
        }
        return () => {
            dispatch(clearSearch());
        };
    }, [dispatch, q]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                Loading…
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-danger py-5">{error}</div>;
    }
    return (
        <Container className="py-4" style={{ height: '100vh' }}>
            <h4 className="sub-tile">Results for “{q}”</h4>
            {results.length === 0 ? (
                <p className="sub-tile">No items found.</p>
            ) : (
                <Row className='my-2 d-flex'>
                    {results.products.map(item => (
                        <Col key={item._id} xs={12} sm={6} md={4}>
                            <ProductCard item={item} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default SearchPage;
