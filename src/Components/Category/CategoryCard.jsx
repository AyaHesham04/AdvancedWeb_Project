import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryCard = ({ img, title, id }) => {
    return (
        <Col
            xs="12"
            sm="12"
            md="12"
            lg="12"
            className="my-1 d-flex justify-content-around"
        >
            <div className="category-card">
                <Link to={`/products/category/${id}`} style={{ textDecoration: 'none' }}>
                    <div className="category-img-wrapper">
                        <img
                            alt="categoryImage"
                            src={img}
                            className="category-card-img"
                        />
                        <div className="category-title">{title}</div>
                    </div>
                </Link>
            </div>
        </Col>
    );
};

export default CategoryCard;