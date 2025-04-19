import React, { useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import CategoryCard from "../Category/CategoryCard";
// import CategoryCard from "./../Category/CategoryCard";

const HomeCategory = () => {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Container>
      <SubTiltle title="Categories" btntitle="More" pathText="/allcategory" />
      <Row className="my-2 d-flex">
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : error ? (
          <h4>Error loading categories</h4>
        ) : categories.length > 0 ? (
          categories.map((item, index) => (
            <CategoryCard key={index} id={item._id} title={item.name} img={item.image} />
          ))
        ) : (
          <h4>No categories available</h4>
        )}
      </Row>
    </Container>
  );
};

export default HomeCategory;
