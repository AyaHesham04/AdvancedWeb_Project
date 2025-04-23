import React, { useEffect, useRef } from "react";
import { Container, Spinner } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import Slider from 'react-slick';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestSellers } from "../../redux/slices/bestSellersSlice";
import ProductCard from "./ProductCard";
import LeftButton from './LeftButton';
import RightButton from './RightButton';

const CardBestsellersContainer = ({ title }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.bestSellers);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // debugger;
  useEffect(() => {
    dispatch(fetchBestSellers());
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      {products && (
        <SubTiltle title={title} />
      )}

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <h4 className="text-danger">{error}</h4>
      ) : products.length === 0 ? (
        <h4>No best-selling products yet.</h4>
      ) : (
        <div className="custom-swiper custom-swiper-wrapper">
          <Slider {...settings} style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}>
            {products.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div className="product-Best">
                  <ProductCard item={item.product} />
                </div>
              </div>
            ))}
          </Slider>

        </div>
      )
      }
    </Container >
  );
};

export default CardBestsellersContainer;
