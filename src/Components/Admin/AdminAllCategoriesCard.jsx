/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteCategory } from '../../redux/slices/categorySlice';

function AdminAllCategoriesCard({ item }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteCategory(item._id));;
        setShow(false);
        window.location.reload();
    };
    return (
        <Col xs="12" sm="6" md="5" lg="4" className="d-flex">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        <div>Confirm Deletion</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure you want to delete this category?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="btn-danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card className="my-2 category-card-admin" style={{ backgroundColor: "rgba(239, 196, 195, 0.1)", borderRadius: "16px 16px 16px 16px" }}>
                <Row className="d-flex justify-content-center px-2">
                    <Col className="d-flex justify-content-between">
                        <div onClick={handleShow} className="d-flex cursor-pointer m-2 icon-hover">
                            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 11V17" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 11V17" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 7H20" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <Link
                            to={`/admin/edit/category/${item._id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="d-flex m-2 icon-hover">
                                <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <title />
                                    <g id="Complete">
                                        <g id="edit">
                                            <g>
                                                <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#979797" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#979797" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </Link>
                    </Col>
                </Row>
                <Link to={`/products/category/${item._id}`} style={{ textDecoration: 'none' }}>
                    <Card.Img
                        style={{ height: "180px", objectFit: 'cover' }}
                        src={item.image}
                        alt="categoryImage"
                    />
                    <Card.Body>
                        <Card.Title>
                            <div className="card-title" style={{ color: '#915970' }}>{item.name}</div>
                        </Card.Title>
                    </Card.Body>
                </Link>
            </Card>
        </Col>
    )
}

export default AdminAllCategoriesCard