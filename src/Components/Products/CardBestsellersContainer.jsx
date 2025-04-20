import React, { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
// import ProductCard from "./ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestSellers } from "../../redux/slices/bestSellersSlice";
import ProductCard from "./ProductCard";

const CardBestsellersContainer = ({ title }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.bestSellers);
  // debugger;
  useEffect(() => {
    dispatch(fetchBestSellers());
  }, [dispatch]);

  return (
    <Container>
      {products && (
        <SubTiltle title={title} btntitle="More" pathText="/best-sellers" />
      )}

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <h4 className="text-danger">{error}</h4>
      ) : products.length === 0 ? (
        <h4>No best-selling products yet.</h4>
      ) : (
        <Swiper
          className="custom-swiper custom-swiper-wrapper"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={5}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {products.map((item, index) => (
            <SwiperSlide SwiperSlide key={index} >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div style={{ width: "70%", margin: "30px" }}>
                  <ProductCard item={item.product} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )
      }
    </Container >
  );
};

export default CardBestsellersContainer;
