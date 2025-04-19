import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CategoryCard = ({ img, title, id }) => {
    return (
        <Col
            xs="6"
            sm="6"
            md="4"
            lg="2"
            className="my-1 d-flex justify-content-around">
            <div className="mb-1">
                <div className="category-card">
                    <Link to={`/products/category/${id}`} style={{ textDecoration: 'none' }}>
                        <div className="category-img-wrapper">
                            <img alt="categoryImage" src={img} className="category-card-img" />
                            <div className="category-hover-text">{title}</div>
                        </div>
                    </Link>
                </div>

            </div>
        </Col>
    )
}

export default CategoryCard
