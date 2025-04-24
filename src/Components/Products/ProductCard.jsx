/* eslint-disable react/prop-types */
import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCartHandle = () => {
    dispatch(addToCart({ productId: item.id }));
  };
  return (
    <Col className="d-flex">
      <Card
        className="my-2 product-card"
        style={{
          backgroundColor: "rgba(239, 196, 195, 0.1)",
          borderRadius: "16px 16px 16px 16px",
        }}
      >
        <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
          <Card.Img
            style={{
              height: "210px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src={item.imageCover}
            alt={item.title}
          />
        </Link>
        <Card.Body>
          <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
            <div className="card-title" style={{ color: '#915970' }}>{item.title}</div>
            <Card.Text>
              <div className="card-text">{item.description}</div>
            </Card.Text>
          </Link>
          <Card.Text className="d-flex justify-content-between align-items-center mt-2">
            <div className="d-flex">
              <div className="d-flex">
                <div className="card-price">
                  {item.priceAfterDiscount >= 1 ? (
                    <div>
                      {item.priceAfterDiscount}
                      <span className="card-currency mx-1">EGP</span>{" "}
                      <span
                        style={{
                          textDecorationLine: "line-through",
                          color: "#979797",
                          fontSize: "14px",
                        }}
                      >
                        {item.price}
                      </span>{" "}
                    </div>
                  ) : (
                    <div>
                      {item.price}
                      <span className="card-currency mx-1">EGP</span>{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div
                className="d-flex p-2 cart-icon-wrapper"
                onClick={addToCartHandle}
              >
                <svg
                  className="cart-icon"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
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
                  </g>
                </svg>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Col>
  );
};

export default ProductCard;
