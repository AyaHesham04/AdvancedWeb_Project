import React, { useEffect } from 'react'
// import Pagination from '../../Components/Uitily/Pagination'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import CategoryCard from '../../Components/Category/CategoryCard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categorySlice';
import SubTiltle from '../../Components/Uitily/SubTiltle';
const AllCategoryPage = () => {

    const dispatch = useDispatch();

    const { categories, loading, error } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    return (
        <div style={{ minHeight: '100vh' }}>
            <Container>
                <SubTiltle title="All Categories" />
                {
                    loading ? (
                        <Spinner animation="border" variant="primary" />
                    ) : error ? (
                        <h6>Error: {error}</h6>
                    ) : categories.length > 0 ? (
                        <Row className='my-2 d-flex'>
                            {categories.map((item, index) => (
                                <Col key={item._id} xs={12} sm={6} md={4} lg={3}>
                                    <CategoryCard key={index} id={item._id} title={item.name} img={item.image} />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <h6>No Categories Available</h6>
                    )
                }
            </Container>
        </div>
    )
}

export default AllCategoryPage
