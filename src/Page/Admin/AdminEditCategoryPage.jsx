import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    Container, Row, Col, ToastContainer
} from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import { useParams } from 'react-router-dom';
import ProductImageManager from '../../Components/Uitily/ImageManger';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryById, updateCategory } from '../../redux/slices/categorySlice';
import { toast } from 'react-toastify';
import CategoryImageManager from '../../Components/Uitily/CategoryImageManger';

const AdminEditCategoryPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedCategory, loading, error } = useSelector((state) => state.category);

    const [name, setName] = useState('');
    const [changes, setChanges] = useState({ newFile: null, removedUrl: null });

    useEffect(() => {
        dispatch(fetchCategoryById(id));
    }, [dispatch, id]);


    useEffect(() => {
        if (selectedCategory) {
            setName(selectedCategory.name || '');
        }
    }, [selectedCategory]);

    const memoizedImages = useMemo(() => {
        return selectedCategory?.image || [];
    }, [selectedCategory?.image]);
    const handleImageChanges = useCallback(({ newFile, removedUrl }) => {
        setChanges({ newFile, removedUrl });
    }, []);

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        if (changes.newFile !== null) {
            formData.append('image', changes.newFile);

        }

        const resultAction = await dispatch(updateCategory({ id, formData }));

        if (updateCategory.fulfilled.match(resultAction)) {
            toast.success('Category updated successfully!');
        } else {
            toast.error(resultAction.payload || 'Update failed');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <div className="pt-3">
                            <div className="admin-content-text pb-2">Edit Category</div>
                        <Row className="justify-content-start">
                            <Col sm="8">
                                <div className="text-form pb-2">Category Image</div>
                                <CategoryImageManager
                                    initialImage={memoizedImages}
                                    onChange={handleImageChanges}
                                />

                                <input
                                    value={name}
                                    onChange={onChangeName}
                                    type="text"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Category Name"
                                />

                                <Row>
                                    <Col sm="16" className="d-flex justify-content-end">
                                        <button onClick={handleSubmit} className="btn-save d-inline mt-2">
                                            {loading ? "Saving..." : "Save Changes"}
                                        </button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <ToastContainer />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminEditCategoryPage;
