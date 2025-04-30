/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import mobile from '../../images/mobile.png'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const CartItem = ({ item, onQuantityChange , updateCartChange}) => {
  const [itemCount, setItemCount] = useState(item.quantity);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const CART_COOKIE = 'cart';


  const getCartFromCookie = () => {
    const cart = Cookies.get(CART_COOKIE);
    return cart ? JSON.parse(cart) : [];
  };



  const deleteItemFromCart = (itemId) => {
    const cart = getCartFromCookie();
    const updatedCart = cart.filter(item => item.productId !== itemId);
    console.log(itemId, updatedCart);
    updateCartChange(updatedCart);
  };

  const handelDeleteItem = () => {
    deleteItemFromCart(item.id);
    handleClose();
  };

  const handleIncrement = () => {
    const newCount = itemCount + 1;
    setItemCount(newCount);
    console.log('new cart cookie:', item.id, newCount); // Debug
    onQuantityChange(item.id, newCount);
  };

  const handleDecrement = () => {
    const newCount = Math.max(1, itemCount - 1);
    setItemCount(newCount);
    onQuantityChange(item.id, newCount);
  };

  const onChangeCount = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setItemCount(value);
    onQuantityChange(item.id, value);
  };

  return (
    <Col xs="12" className="cart-item-body my-2 d-flex p-3">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div>Confirm Deletion</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure you want to remove this item from the cart?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="btn-danger" onClick={handelDeleteItem}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Link to={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
        <img width="120px" height="120px" src={item ? item.imageCover : mobile} alt="productImage" />
      </Link>
      <div className="w-100 mx-3">
        <Row className="justify-content-between">
          <Col sm="12" className="d-flex flex-row justify-content-between">
            <div className="d-inline cat-text">
              {item?.title || ''}
            </div>
            <div onClick={handleShow} className="d-flex cursor-pointer icon-hover">
              <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11V17" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 11V17" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 7H20" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Col>
        </Row>
        <Link to={`/products/${item?.id}`} style={{ textDecoration: 'none' }}>
          <Row className="justify-content-center mt-2">
            <Col sm="12" className="d-flex flex-row justify-content-start">
              <div className="d-inline cat-title">

                {item?.category?.name || ""}
              </div>
            </Col>
          </Row>
        </Link>
        <Row className="d-flex justify-content-between align-items-center">
          <Col sm="12" className="quantity-price-container">
            <div className="d-inline pt-3 d-flex">
              <div className="quantity-price-container">
                Quantity:
              </div>
              <div
                className="d-flex align-items-center mx-2"
                style={{
                  backgroundColor: '#f9f6f6',
                  border: '1px solid rgb(204, 202, 202)',
                  borderRadius: '3px',
                  width: '80px',
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
            <div className="price-text d-inline pt-4">{item.price || 0} EGP</div>
          </Col>
        </Row>
      </div>
    </Col>
  )
}

export default CartItem
