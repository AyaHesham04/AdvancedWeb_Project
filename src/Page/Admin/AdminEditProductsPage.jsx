import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ToastContainer } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct } from '../../redux/slices/productsSlice';
import { toast } from 'react-toastify';
import { fetchCategories } from '../../redux/slices/categorySlice';

const AdminEditProductsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const categories = useSelector(state => state.category.categories);

    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState(0);
    const [priceAfter, setPriceAfter] = useState(0);
    const [Cat, setCat] = useState([]);
    const [coverImage, setCoverImage] = useState(null);

    useEffect(() => {
        dispatch(fetchProductById(id));
        dispatch(fetchCategories());
    }, [id, dispatch]);

    useEffect(() => {
        if (product) {
            console.log(product.imageCover);
            setProdName(product.title);
            setProdDescription(product.description);
            setPriceBefore(product.price);
            setPriceAfter(product.priceAfterDiscount || 0);
            setCat([product.category.name, product.category._id]);
            setExistingImages(product.images || []);
            setCoverImage(product.imageCover || null);
            setNewImages([]);
        }
    }, [product]);

    const onChangeProdName = (e) => setProdName(e.target.value);
    const onChangeDesName = (e) => setProdDescription(e.target.value);
    const onChangePriceBefore = (e) => setPriceBefore(e.target.value);
    const onChangePriceAfter = (e) => setPriceAfter(e.target.value);
    const onSelectCategory = (e) => {
        const selectedId = e.target.value;
        const selectedCat = categories.find(cat => cat._id === selectedId);
        if (selectedCat) {
            setCat([selectedCat.name, selectedCat._id]);
        }
    }
    const handleAddImages = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(prev => [...prev, ...files]);
        e.target.value = null;
    };


    const allImages = [
        ...existingImages.map(url => ({ type: 'url', data: url })),
        ...newImages.map(file => ({ type: 'file', data: file })),
    ];


    const handleDeleteImage = (idx) => {
        if (idx < existingImages.length) {
            setExistingImages(prev => prev.filter((_, i) => i !== idx));
        } else {
            const newIdx = idx - existingImages.length;
            setNewImages(prev => prev.filter((_, i) => i !== newIdx));
        }
    };


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('title', prodName);
        formData.append('description', prodDescription);
        formData.append('price', Number(priceBefore));
        formData.append('priceAfterDiscount', Number(priceAfter));
        formData.append('category', Cat[1]);
        const imagesOnly = allImages.map(image => image.data);

        if (coverImage) {
            formData.append('imageCover', coverImage);
        } else if (allImages.length > 0) {

            formData.append('imageCover', allImages[0].data);
        }
        imagesOnly.forEach((image) => {
            formData.append('images', image);
        });
        console.log(imagesOnly);


        try {
            await dispatch(updateProduct({ id, formData })).unwrap();
            toast.success('Product updated successfully!');
        } catch {
            toast.error('Update failed!');
        }
    };
    return (
        <Container fluid className="px-10" style={{ minHeight: '100vh' }}>
            <Row className='py-3 flex-column flex-sm-row'>
                <Col sm="3" xs="12" md="3">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="12" md="9">
                    <div className="pt-3">
                        <div className="admin-content-text pb-2">
                            Edit Product - {prodName}
                        </div>
                        <Row className="justify-content-start">
                            <Col sm="8">
                                <div className="text-form pb-2">Cover Image</div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setCoverImage(e.target.files[0])}
                                    className="d-block mb-4"
                                />
                                {coverImage && (
                                    <div className="mb-3">
                                        <img
                                            src={typeof coverImage === 'string' ? coverImage : URL.createObjectURL(coverImage)}
                                            alt="Cover Preview"
                                            className="border rounded"
                                            style={{ width: 150, height: 150, objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                                <div className="text-form pb-2">Images</div>

                                <div className="d-flex flex-wrap mb-3">
                                    {allImages.map(({ type, data }, idx) => {
                                        const src = type === 'url' ? data : URL.createObjectURL(data);
                                        return (
                                            <div key={idx} className="position-relative m-1">
                                                <img
                                                    src={src}
                                                    alt={`Preview ${idx}`}
                                                    className="border rounded"
                                                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteImage(idx)}
                                                    className="btn btn-sm btn-danger position-absolute"
                                                    style={{ top: 0, right: 0 }}
                                                >&times;</button>
                                            </div>
                                        );
                                    })}
                                </div>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleAddImages}
                                    className="d-block mb-4"
                                />

                                <div>Product Name</div>
                                <input
                                    value={prodName}
                                    onChange={onChangeProdName}
                                    type="text"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Product Name"
                                />
                                <textarea
                                    className="input-form-area p-2 mt-3"
                                    rows="4"
                                    cols="50"
                                    placeholder="Product Description"
                                    value={prodDescription}
                                    onChange={onChangeDesName}
                                />
                                <input
                                    type="number"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Price Before Discount"
                                    value={priceBefore}
                                    onChange={onChangePriceBefore}
                                />
                                <input
                                    type="number"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Price After Discount"
                                    value={priceAfter}
                                    onChange={onChangePriceAfter}
                                />
                                <select
                                    name="cat"
                                    value={Cat[1]}
                                    onChange={onSelectCategory}
                                    className="select input-form-area mt-3 px-2"
                                >
                                    <option value="0">{Cat[0]}</option>
                                    {categories.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="8" className="d-flex justify-content-end">
                                <button onClick={handleSubmit} className="btn-save d-inline mt-2">
                                    Save Changes
                                </button>
                            </Col>
                        </Row>
                        <ToastContainer />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminEditProductsPage;
