import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categorySlice';
import AdminAllCategoriesCard from '../../Components/Admin/AdminAllCategoriesCard';

const AdminAllCategoriesPage = () => {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
      <Row className='py-3 flex-column flex-sm-row'>
        <Col sm="3" xs="12" md="3">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="12" md="9">
          <div className="pt-3">
            <div className="admin-content-text pb-2">Manage All Categories</div>
            <Row className="justify-content-start">
              {loading ? (
                <h6>Loading...</h6>
              ) : error ? (
                <h6 className="text-danger">{error}</h6>
              ) : categories && categories.length > 0 ? (
                categories.map((item, index) => (
                  <AdminAllCategoriesCard key={index} item={item} />
                ))
              ) : (
                <h6>No categories available yet</h6>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAllCategoriesPage;