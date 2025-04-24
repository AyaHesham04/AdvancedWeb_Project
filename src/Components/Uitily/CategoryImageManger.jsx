import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

const CategoryImageManager = ({ initialImage = null, onChange }) => {
    const [image, setImage] = useState(null);
    const [newFile, setNewFile] = useState(null);
    const [removedUrl, setRemovedUrl] = useState(null);
    const fileInputRef = useRef();
    useEffect(() => {
        if (initialImage && !image) {
            setImage({ url: initialImage, isNew: false });
        }
    }, [initialImage, image]);

    useEffect(() => {
        if (onChange) {
            onChange({ newFile, removedUrl });
        }
    }, [newFile, removedUrl, onChange]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImage = {
                id: URL.createObjectURL(file),
                url: URL.createObjectURL(file),
                file,
                isNew: true,
            };
            setImage(newImage);
            setNewFile(file);
        }
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleRemove = () => {
        setImage(null);
        if (image?.isNew) {
            setNewFile(null);
        } else {
            setRemovedUrl(image?.url);
        }
    };

    return (
        <div>
            <Form.Group controlId="category-image">
                <Form.Label>Upload Category Image</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
            </Form.Group>

            {image && (
                <Row className="mt-3">
                    <Col className="mb-3">
                        <div className="position-relative">
                            <img
                                src={image.url}
                                alt="preview"
                                className="img-fluid rounded"
                                style={{ objectFit: 'cover', width: '100%', height: '120px' }}
                            />
                            <Button
                                variant="light"
                                size="sm"
                                className="position-absolute top-0 end-0 m-1 p-0"
                                style={{ borderRadius: '50%' }}
                                onClick={handleRemove}
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default CategoryImageManager;
