import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

const ProductImageManager = ({ initialImages = [], onChange }) => {
    const [items, setItems] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const [removedUrls, setRemovedUrls] = useState([]);
    const fileInputRef = useRef();

    useEffect(() => {
        if (initialImages.length > 0 && items.length === 0) {
            const mapped = initialImages.map((url) => ({ id: url, url, isNew: false }));
            setItems(mapped);
            setRemovedUrls([]);
        }
    }, [initialImages, items.length]);

    useEffect(() => {
        if (onChange) {
            onChange({ newFiles, removedUrls });
        }
    }, [newFiles, removedUrls, onChange]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newItems = files.map((file) => ({
            id: URL.createObjectURL(file),
            url: URL.createObjectURL(file),
            file,
            isNew: true,
        }));

        setItems((prev) => [...prev, ...newItems]);
        setNewFiles((prev) => [...prev, ...files]);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleRemove = (item) => {
        setItems((prev) => prev.filter((i) => i.id !== item.id));
        if (item.isNew) {
            setNewFiles((prev) => prev.filter((f) => f !== item.file));
        } else {
            setRemovedUrls((prev) => [...prev, item.url]);
        }
    };

    return (
        <div>
            <Form.Group controlId="product-images">
                <Form.Label>Upload Images</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
            </Form.Group>

            <Row xs={2} sm={3} md={4} lg={6} className="mt-3">
                {items.map((item) => (
                    <Col key={item.id} className="mb-3">
                        <div className="position-relative">
                            <img
                                src={item.url}
                                alt="preview"
                                className="img-fluid rounded"
                                style={{ objectFit: 'cover', width: '100%', height: '120px' }}
                            />
                            <Button
                                variant="light"
                                size="sm"
                                className="position-absolute top-0 end-0 m-1 p-0"
                                style={{ borderRadius: '50%' }}
                                onClick={() => handleRemove(item)}
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductImageManager;