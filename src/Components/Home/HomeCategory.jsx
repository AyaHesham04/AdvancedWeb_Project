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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0px',
        },
      },
    ],
  };

  return (
    <Container>
      <SubTiltle title="Categories" btntitle="More" pathText="/allcategory" />
      <Row className="my-2 d-flex">
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
