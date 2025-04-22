/* eslint-disable react/no-unknown-property */
import React, { useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SubTiltle from "../Uitily/SubTiltle";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import CategoryCard from "../Category/CategoryCard";

const HomeCategory = () => {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const slider = document.querySelector(".slick-slider");
    if (!slider) return;

    const preventVerticalScroll = (e) => {
      const touch = e.touches[0];
      const startX = touch.clientX;
      let movedX = 0;

      const onTouchMove = (moveEvent) => {
        const newTouch = moveEvent.touches[0];
        movedX = Math.abs(newTouch.clientX - startX);
        if (movedX > 10) {
          moveEvent.preventDefault();
        }
      };

      slider.addEventListener("touchmove", onTouchMove);
      return () => slider.removeEventListener("touchmove", onTouchMove);
    };

    slider.addEventListener("touchstart", preventVerticalScroll);
    return () => slider.removeEventListener("touchstart", preventVerticalScroll);
  }, []);


  const LeftButton = (onClick, onDisable) => {
    return (
      <svg
        className="leftBtn"
        onClick={onClick}
        onDisable={onDisable}
        style={{
          position: 'absolute',
          top: '50%',
          zIndex: 10,
          cursor: 'pointer',
        }}
        width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#efc4c3" /> </g>
      </svg >
    )
  }
  const RightButton = (onClick, onDisable) => {
    return (
      <svg
        className="rightBtn"
        onClick={onClick}
        onDisable={onDisable}
        style={{
          position: 'absolute',
          top: '50%',
          zIndex: 10,
          cursor: 'pointer',

        }}
        width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#efc4c3" /> </g>
      </svg>
    )
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '0px',
    swipe: true,
    touchMove: true,
    touchThreshold: 10,
    swipeToSlide: true,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    pauseOnDotsHover: true,
    nextArrow: <RightButton />,
    prevArrow: <LeftButton />,
    appendDots: (dots) => (
      <div style={{ textAlign: "center" }}>
        <ul className="custom-dots"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <button aria-label={`Slide ${i + 1}`} className="custom-dot">
        {i + 1}
      </button>
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <Container>
      <SubTiltle title="Categories" btntitle="More" pathText="/allcategory" />
      <Row className="my-2 d-flex overflow-hidden">
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : error ? (
          <h4>Error loading categories</h4>
        ) : categories.length > 0 ? (
          <Slider {...settings}>
            {categories.map((item, index) => (
              <div key={index} className="px-2">
                <CategoryCard
                  id={item._id}
                  title={item.name}
                  img={item.image}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <h4>No categories available</h4>
        )}
      </Row>
    </Container>
  );
};

export default HomeCategory;
