import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Container, Row, Col, ToastContainer } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct } from '../../redux/slices/productsSlice';
import { toast } from 'react-toastify';
import { fetchCategories } from '../../redux/slices/categorySlice';
import ProductImageManager from '../../Components/Uitily/ImageManger';

const AdminEditProductsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const categories = useSelector((state) => state.category.categories);

    const [images, setImages] = useState({});
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState(0);
    const [priceAfter, setPriceAfter] = useState(0);
    const [qty, setQty] = useState(0);
    const [Cat, setCat] = useState([]);
    const [changes, setChanges] = useState({ newFiles: [], removedUrls: [] });
    const memoizedImages = useMemo(() => {
        return product?.images || [];
    }, [product?.images]);
    useEffect(() => {
    }, [id, dispatch]);
    useEffect(() => {
        dispatch(fetchProductById(id));
        dispatch(fetchCategories());

    }, [id, dispatch]);

    console.log(Cat);
    useEffect(() => {
        if (product) {
            setProdName(product.title);
            setProdDescription(product.description);
            setPriceBefore(product.price);
            setPriceAfter(product.priceAfterDiscount || 0);
            setQty(product.quantity);
            setCat([product.category.name, product.category._id]);
            setImages(product.images);
        }
    }, [product]);
    const onChangeProdName = (e) => setProdName(e.target.value);
    const onChangeDesName = (e) => setProdDescription(e.target.value);
    const onChangePriceBefore = (e) => setPriceBefore(e.target.value);
    const onChangePriceAfter = (e) => setPriceAfter(e.target.value);
    const onChangeQty = (e) => setQty(e.target.value);
    const onSelectCategory = (e) => {
        const selectedId = e.target.value;
        const selectedCat = categories.find(cat => cat._id === selectedId);
        if (selectedCat) {
            setCat([selectedCat.name, selectedCat._id]);
        }
    };
    const handleImageChanges = useCallback(
        ({ newFiles, removedUrls }) => {
            setChanges((prev) => {
                if (
                    prev.newFiles === newFiles &&
                    prev.removedUrls === removedUrls
                ) {
                    return prev;
                }
                return { newFiles, removedUrls };
            });
        },
        []
    );

    const handleSubmit = async () => {
        const formData = {
            title: prodName,
            description: prodDescription,
            price: Number(priceBefore),
            priceAfterDiscount: Number(priceAfter),
            quantity: Number(qty),
            category: Cat[1],
            imageCover: memoizedImages[0],
            images: memoizedImages,
        };
        try {
            await dispatch(updateProduct({ id, formData })).unwrap();
            toast.success('Product updated successfully!');
        } catch (err) {
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
                        <div className="admin-content-text pb-2">Edit Product - {prodName}</div>
                        <Row className="justify-content-start">
                            <Col sm="8">
                                <div className="text-form pb-2">Product Images</div>
                                <ProductImageManager
                                    initialImages={memoizedImages}
                                    onChange={handleImageChanges}
                                />
                                Product Name
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
                                <input
                                    type="number"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Available Quantity"
                                    value={qty}
                                    onChange={onChangeQty}
                                />
                                <select
                                    name="cat"
                                    value={Cat[1]}
                                    onChange={onSelectCategory}
                                    className="select input-form-area mt-3 px-2">
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
                                <button onClick={handleSubmit} className="btn-save d-inline mt-2">Save Changes</button>
                            </Col>
                        </Row>
                        <ToastContainer />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default AdminEditProductsPage