import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form, Alert, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import { fetchSliders, deleteSlider, uploadSlider } from '../../redux/slices/sliderSlice';

const AdminSliderPage = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.slider);
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    // Modal state
    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleClose = () => {
        setShow(false);
        setSelectedId(null);
    };

    const handleShow = (id) => {
        setSelectedId(id);
        setShow(true);
    };

    useEffect(() => {
        dispatch(fetchSliders());
    }, [dispatch]);

    const handleDelete = async () => {
        if (!selectedId) return;
        try {
            await dispatch(deleteSlider(selectedId)).unwrap();
            dispatch(fetchSliders());
        } catch (error) {
            console.error('Delete failed:', error);
        } finally {
            handleClose();
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploadError(null);
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadError('Please select an image to upload.');
            return;
        }
        try {
            await dispatch(uploadSlider(file)).unwrap();
            setFile(null);
            setUploadError(null);
            dispatch(fetchSliders()); // Refresh after upload
        } catch (err) {
            setUploadError(err.message || 'Upload failed.');
        }
    };

    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
             <Row className='py-3 flex-column flex-sm-row'>
        <Col sm="3" xs="12" md="3">
          <AdminSideBar />
        </Col>

                {/* Delete Modal */}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this slider image?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete} disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Delete'}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Col sm="9" xs="12" md="9">
          <div className="pt-3">
                        <div className="admin-content-text pb-2">Manage Sliders</div>
                        <Row className="justify-content-start">
                        {/* Upload */}
                        <Col sm="12">

                        <Card className="mb-4 shadow-sm">
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Select Slider Image</Form.Label>
                                        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                                    </Form.Group>
                                    {uploadError && <Alert variant="danger">{uploadError}</Alert>}
                                    <button className="btn-save" onClick={handleUpload} disabled={loading}>
                                        {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Upload'}
                                    </button>
                                </Form>
                            </Card.Body>
                        </Card>
                        </Col>
                        </Row>
                    </div>
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* Sliders List */}
                    <Row xs={1} sm={2} lg={3} className="g-4">
                        
                        {items.map((slide) => (
                            <Col key={slide._id}>
                                <Card className="h-100 shadow-sm">
                                    <div style={{ overflow: 'hidden', height: 200 }}>
                                        <Card.Img
                                            variant="top"
                                            src={slide.image}
                                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                        />
                                    </div>
                                    <Card.Body className="d-flex justify-content-end">
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleShow(slide._id)} 
                                            disabled={loading}
                                        >
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminSliderPage;
