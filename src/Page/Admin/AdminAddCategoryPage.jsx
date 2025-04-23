import React, { useState } from 'react'
import { Container, Row, Col, Spinner, ToastContainer } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../redux/slices/categorySlice';
const AdminAddCategoryPage = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.category);

    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [isPress, setIsPress] = useState(false);

    const onChangeName = (e) => setName(e.target.value);

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setImgPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handelSubmit = async () => {
        if (!name || !image) {
            return toast.warning('Please provide all fields');
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        setIsPress(true);
        await dispatch(createCategory(formData));
        setIsPress(false);
        setName('');
        setImage(null);
        setImgPreview(null);
    };

    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <div className="pt-3">
                        <Row className="justify-content-start">
                            <div className="admin-content-text pb-4">Add New Category</div>
                            <Col sm="8">
                                <div className="text-form pb-2">Category Image</div>
                                <div>
                                    <label for="upload-photo">
                                        <img
                                            src={imgPreview}
                                            alt="uploadCategoryImage"
                                            height="100px"
                                            width="120px"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </label>
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={onImageChange}
                                        id="upload-photo"
                                    />
                                </div>

                                <input
                                    onChange={onChangeName}
                                    value={name}
                                    type="text"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Category Name"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="8" className="d-flex justify-content-end">
                                <button onClick={handelSubmit} className="btn-save d-inline mt-2">Save Changes</button>
                            </Col>
                        </Row>

                        {isPress ? (loading ? <Spinner animation="border" variant="primary" /> : <h4>Completed</h4>) : null}

                        <ToastContainer />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAddCategoryPage
