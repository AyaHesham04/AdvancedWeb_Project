import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { clearSearch, fetchSearchResults } from '../../redux/slices/searchSlice';

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
    debugger;
    return (
        <Container className="py-4">
            <h4>Results for “{q}”</h4>
            {results.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <Row>
                    {results.products.map(item => (
                        <Col key={item._id} xs={12} md={4} className="mb-3">
                            {/* render your product card */}
                            <div className="card">
                                <img src={item.imageCover} className="card-img-top" alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description.slice(0, 60)}…</p>
                                    <a href={`/products/${item._id}`} className="btn btn-sm btn-dark">
                                        View
                                    </a>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default SearchPage;
