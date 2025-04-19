import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SubTiltle from '../Uitily/SubTiltle'
import ProductCard from './ProductCard'
import CardContainerHook from '../../hook/products/card-container-hook'

const CardProductsContainer = ({ title, btntitle, pathText, products }) => {
  const [favProd] = CardContainerHook()
  const [displayProducts, setDisplayProducts] = useState([])

  useEffect(() => {
    const updateDisplayProducts = () => {
      if (products && products.length > 0) {
        const shuffled = [...products].sort(() => 0.5 - Math.random())
        setDisplayProducts(shuffled)
      }
    }

    updateDisplayProducts()
    window.addEventListener('resize', updateDisplayProducts)

    return () => window.removeEventListener('resize', updateDisplayProducts)
  }, [products])

  return (
    <Container>
      {products ? (
        <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
      ) : null}
      <Row className='my-2 d-flex'>
        {displayProducts.map((item, index) => (
          <Col key={index} xs={12} md={3}>
            <ProductCard favProd={favProd} item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default CardProductsContainer
