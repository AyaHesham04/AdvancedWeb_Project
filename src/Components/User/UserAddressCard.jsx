import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAddress } from '../../redux/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserAddressCard = ({ item }) => {
    const dispatch = useDispatch();

    const { deletingAddress, error } = useSelector(state => state.auth);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (error) {
            toast.error(error.message || error);
        }
    }, [error]);

    const openDelete = () => setShowDeleteModal(true);
    const closeDelete = () => setShowDeleteModal(false);

    const handleDelete = async () => {
        try {
            await dispatch(deleteUserAddress({ id: item._id })).unwrap();
            toast.success('Address deleted');
            closeDelete();
        } catch (err) {
            toast.error(err);

        }
    };

    return (
        <div className="user-address-card my-3 px-2">
            {/* —— Delete Confirmation Modal —— */}
            <Modal show={showDeleteModal} onHide={closeDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the address “
                    <strong>{item.alias}</strong>”?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDelete}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        disabled={deletingAddress}
                        onClick={handleDelete}
                    >
                        {deletingAddress ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* —— Card Content —— */}
            <div className="my-2 px-3 py-2 border rounded">
                <Row className="d-flex justify-content-between align-items-center">
                    <Col xs="6">
                        <h5 className="mb-1">{item.alias}</h5>
                    </Col>
                    <Col xs="6" className="d-flex justify-content-end">
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={openDelete}
                        >
                            Delete
                        </Button>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <p className="mb-1">{item.details}</p>
                        <p className="text-muted mb-0">
                            <strong>Phone:</strong> {item.phone}
                        </p>
                        {item.city && (
                            <p className="text-muted mb-0">
                                <strong>City:</strong> {item.city}
                            </p>
                        )}
                        {item.postalCode && (
                            <p className="text-muted mb-0">
                                <strong>Postal Code:</strong> {item.postalCode}
                            </p>
                        )}
                    </Col>
                </Row>
            </div>

            <ToastContainer position="bottom-center" />
        </div>
    );
};

export default UserAddressCard;
