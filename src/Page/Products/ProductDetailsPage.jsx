import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ToastContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../redux/slices/productsSlice';
import ImageSlider from '../../Components/Uitily/ImageSlider';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const addToCartHandle = () => {
    console.log('Add to cart', product);
  };

  if (loading || !product) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger py-5">{error}</div>;
  }

  const onChangeCount = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setItemCount(value);
  };

  const handleIncrement = () => {
    setItemCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setItemCount((prev) => Math.max(1, prev - 1));
  };
  const galleryImages = product.images.map((url) => ({
    original: url
  }));
  return (
    <div style={{ minHeight: '100vh' }}>
      <Container className="py-5">
        <Row className="product-details">
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <div className="image-container" style={{ maxWidth: '600px', maxHeight: '350px' }}>
              <ImageSlider images={galleryImages} />
            </div>
          </Col>

          <Col md={6} className="d-flex flex-column justify-content-center">
            <div className="product-details-body">
              <div className="product-title-details">{product.title}</div>
              <p className="details-description mt-3">{product.description}</p>
              <Row className="d-flex justify-content-between align-items-center">
                <Col sm="12" className="d-flex flex-row justify-content-between">
                  <div className="card-price mt-3">
                    {product.priceAfterDiscount >= 1 ? (
                      <div>
                        {product.priceAfterDiscount}
                        <span className="card-currency mx-1">EGP</span>
                        <span style={{ textDecorationLine: 'line-through', color: '#979797', fontSize: '14px' }}>
                          {product.price}
                        </span>
                      </div>
                    ) : (
                      <span>{product.price} EGP</span>
                    )}
                  </div>
                  <div className="d-inline pt-3 d-flex">
                    <div
                      className="d-flex align-items-center mx-2"
                      style={{
                        backgroundColor: '#f9f6f6',
                        border: '1px solid rgb(204, 202, 202)',
                        borderRadius: '3px',
                        width: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <button
                        onClick={handleDecrement}
                        style={{
                          background: '#f9f6f6',
                          borderLeft: 'none',
                          borderTop: 'none',
                          borderBottom: 'none',
                          borderRight: '1px solid rgb(225, 220, 220)',
                          width: '23px',
                          borderTopLeftRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#b0787b',
                          cursor: 'pointer',
                          paddingLeft: '5px',
                          paddingRight: '5px',
                        }}
                        className="cart-icon"
                      >
                        -
                      </button>
                      <input
                        value={itemCount}
                        onChange={onChangeCount}
                        type="text"
                        style={{
                          width: '25px',
                          height: '25px',
                          textAlign: 'center',
                          border: 'none',
                          borderRadius: '3px',
                          background: 'transparent',
                          fontSize: '12px',
                          margin: '0 5px',
                          color: '#b0787b',
                        }}
                      />
                      <button
                        onClick={handleIncrement}
                        style={{
                          background: '#b0787b',
                          border: 'none',
                          borderRadius: '3px',
                          height: '100%',
                          width: '23px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          cursor: 'pointer',
                          paddingLeft: '5px',
                          paddingRight: '5px',
                        }}
                        className="cart-icon"
                      >
                        +
                      </button>
                    </div>
                    {/* <Button onClick={handeleUpdateCart} className='btn btn-dark'>Apply</Button> */}
                  </div>
                </Col>
              </Row>

              <div className="d-flex justify-content-start w-100 my-3">
                <button className="py-2 cart-icon-wrapper-details" onClick={addToCartHandle}>
                  <span className="cart-icon mx-2">Add to Cart</span>
                  <svg className="cart-icon" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.99219 11H11.9922M13.9922 11H11.9922M11.9922 11V9M11.9922 11V13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default ProductDetailsPage;