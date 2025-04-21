import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import AdminAllCategories from '../../Components/Admin/AdminAllCategories';
import Pagination from '../../Components/Uitily/Pagination';
import ViewCategoryAdminHook from '../../hook/admin/view-category-admin-hook';

const AdminAllCategoriesPage = () => {
  const [items, pagination, onPress] = ViewCategoryAdminHook();

  // Compute pageCount safely
  const pageCount = pagination || 0;

  return (
    <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
      <Row className='py-3 flex-column flex-sm-row'>
        <Col sm="3" xs="12" md="3">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="12" md="9">
          <AdminAllCategories categories={items} />
          {pageCount > 1 && <Pagination pageCount={pageCount} onPress={onPress} />}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAllCategoriesPage;