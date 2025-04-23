import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ToastContainer } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../redux/slices/productsSlice'
import { fetchCategories } from '../../redux/slices/categorySlice'
const AdminAddProductsPage = () => {
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('');
    const [priceAftr, setPriceAftr] = useState('');
    const [qty, setQty] = useState('');
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

    const handelSubmit = () => {
        const productData = {
            title: prodName,
            description: prodDescription,
            priceBefore,
            priceAfter: priceAftr,
            quantity: qty,
            category: selectedCategoryId,
            images: images.map(img => img.data_url),
        };

        dispatch(createProduct(productData))
            .unwrap()
            .then(() => {
                toast.success("Product added successfully!");
            })
            .catch((error) => {
                toast.error("Failed to add product.");
                console.error(error);
            });
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
                            <div className="admin-content-text pb-4">Add New Product</div>
                            <Col sm="8">
                                <div className="text-form pb-2">Product Images</div>

                                {/* <MultiImageInput
                                    images={images}
                                    setImages={setImages}
                                    theme={"light"}
                                    allowCrop={false}
                                    max={4}
                                /> */}

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
                                <input
                                    type="number"
                                    className="input-form d-block mt-3 px-3"
                                    placeholder="Available Quantity"
                                    value={qty}
                                    onChange={onChangeQty}
                                />
                                <select
                                    name="cat"
                                    onChange={onSeletCategory}
                                    className="select input-form-area mt-3 px-2 ">
                                    <option value="0">Category</option>
                                    {
                                        categories.data ? (categories.data.map((item, index) => {
                                            return (
                                                <option key={index} value={item._id}>{item.name}</option>
                                            )
                                        })) : null
                                    }
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
