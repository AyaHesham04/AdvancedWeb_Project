import React, { useEffect } from 'react';
import { Container, Row, Col, ToastContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../redux/slices/productsSlice';
import RightButton from '../../Components/Products/RightButton';
import LeftButton from '../../Components/Products/LeftButton';
import ImageGallery from 'react-image-gallery';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const addToCartHandle = () => {

    console.log("Add to cart", product);
  };

  if (loading || !product) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }
  if (error) return <div className="text-center text-danger py-5">{error}</div>;
  return (
    <div style={{ minHeight: "600px" }}>
      <Container>
        <Container className="d-flex justify-content-center align-items-center">
          <Row className="pt-3">
            <Col>
              <div className="product-details">
                <div className="image-container" style={{ maxWidth: '600px', maxHeight: '350px', margin: '0 auto' }}>
                  <ImageGallery
                    items={product.images}
                    showFullscreenButton={false}
                    isRTL={true}
                    showPlayButton={false}
                    showThumbnails={false}
                    renderRightNav={RightButton}
                    renderLeftNav={LeftButton}
                  />
                </div>
                <div className="d-inline text-center mt-4">
                  <Row>
                    <Col>
                      <div className="card-title d-inline">
                        {product.title}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <div className="details-description d-inline">
                        {product.description}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col className="d-flex justify-content-center align-items-center">
                      <div className="d-flex">
                        <div className="d-flex">
                          <div className="card-price">
                            {product.priceAfterDiscount >= 1 ?
                              (<div>{product.priceAfterDiscount}<span className="card-currency mx-1">EGP</span> <span style={{ textDecorationLine: 'line-through', color: "#979797", fontSize: "14px" }}>{product.price}</span> </div>)
                              : product.price}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <ToastContainer />
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 my-3">
                <div className="d-flex py-2 cart-icon-wrapper" onClick={addToCartHandle}>
                  <span className="cart-icon mx-2">Add to Cart</span>
                  <svg className="cart-icon" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.99219 11H11.9922M13.9922 11H11.9922M11.9922 11V9M11.9922 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default ProductDetailsPage;
