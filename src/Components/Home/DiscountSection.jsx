import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import image from "../../images/Offers.png"
const DiscountSection = () => {
    return (
        <Container className='w-100'>
            <img 
            className="discount-img my-3"
            src={image}
            alt="discount image"
            />
        </Container>
    )
}

export default DiscountSection
