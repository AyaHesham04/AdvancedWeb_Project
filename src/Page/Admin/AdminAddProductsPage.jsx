import React, { useCallback, useEffect, useState } from 'react'
import { Container, Row, Col, ToastContainer } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../redux/slices/productsSlice'
import { fetchCategories } from '../../redux/slices/categorySlice'
import { toast } from 'react-toastify';

const AdminAddProductsPage = () => {
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('');
    const [priceAftr, setPriceAftr] = useState('');
    const [qty, setQty] = useState(1000);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [images, setImages] = useState([]);
    const categories = useSelector((state) => state.category.categories);
    const onChangeProdName = (e) => setProdName(e.target.value);
    const onChangeDesName = (e) => setProdDescription(e.target.value);
    const onChangePriceBefor = (e) => setPriceBefore(e.target.value);
    const onChangePriceAfter = (e) => setPriceAftr(e.target.value);
    const onChangeQty = (e) => setQty(e.target.value);
    const onSeletCategory = (e) => setSelectedCategoryId(e.target.value);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const handleImageDelete = (index) => {
        setImages(prev => {
            const newImages = [...prev];
            URL.revokeObjectURL(newImages[index].preview);
            newImages.splice(index, 1);
            return newImages;
        });
    };

    const handelSubmit = async () => {
        try {

            const formData = new FormData();
            formData.append('title', prodName);
            formData.append('description', prodDescription);
            formData.append('price', priceBefore);
            formData.append('priceAfterDiscount', priceAftr);
            formData.append('quantity', qty);
            formData.append('category', selectedCategoryId);

            if (images.length > 0) {
                formData.append('imageCover', images[0].file);
            }

            images.forEach((img, index) => {
                formData.append('images', img.file);
            });

            console.log('FormData prepared:', formData);

            dispatch(createProduct(formData))
                .unwrap()
                .then(() => {
                    toast.success("Product added successfully!");
                    setImages([]);
                })
                .catch((error) => {
                    toast.error("Failed to add product.");
                    console.error(error);
                });
        } catch (error) {
            toast.error("Error processing images.");
            console.error(error);
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
                        <div className="admin-content-text pb-2">Add New Product</div>
                        <Row className="justify-content-start">
                            <Col sm="8">
                                <div className="text-form pb-2">Product Images</div>
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="input-form d-block"
                                    />
                                    <div className="d-flex flex-wrap mt-2">
                                        {images.map((img, index) => (
                                            <div key={index} className="position-relative m-2">
                                                <img
                                                    src={img.preview}
                                                    alt={`preview ${index}`}
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleImageDelete(index)}
                                                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                    style={{ transform: 'translate(50%, -50%)' }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                                    onChange={onChangePriceBefor}
                                />
                                <input
                                    type="number"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Price After Discount"
                                    value={priceAftr}
                                    onChange={onChangePriceAfter}
                                />
                                <select
                                    name="cat"
                                    onChange={onSeletCategory}
                                    className="select input-form-area mt-3 px-2"
                                >
                                    <option value="0">Category</option>
                                    {categories ? (
                                        categories.map((item, index) => (
                                            <option key={index} value={item._id}>{item.name}</option>
                                        ))
                                    ) : null}
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="8" className="d-flex mt-2 justify-content-end">
                                <button onClick={handelSubmit} className="btn-save d-inline mt-2">Save Changes</button>
                            </Col>
                        </Row>
                        <ToastContainer />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAddProductsPage