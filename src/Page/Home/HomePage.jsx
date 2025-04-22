import React from 'react'
import HomeCategory from '../../Components/Home/HomeCategory';
// import CardProductsContainerHome from '../../Components/Products/CardProductsContainerHome';
// import CardBestsellersContainer from '../../Components/Products/CardBestsellersContainer';
// import NavBarLogin from '../../Components/Uitily/NavBarLogin';
import Slider from '../../Components/Home/Slider';
import CardBestsellersContainer from '../../Components/Products/CardBestsellersContainer';
import DiscountSection from '../../Components/Home/DiscountSection';
import CardProductsContainerHome from '../../Components/Products/CardProductsContainerHome';
// import DiscountSection from './../../Components/Home/DiscountSection';
// import Footer from '../../Components/Uitily/Footer';
// import ViewHomeProductsHook from './../../hook/products/view-home-products-hook';

const HomePage = () => {
    return (
        <div className='font' style={{ minHeight: '100vh' }}>
            <Slider />
            <CardBestsellersContainer title="Best Sellers" />
            <HomeCategory />
            <DiscountSection />
            <CardProductsContainerHome title="Products" btntitle="See More" pathText="/products" />
        </div>
    )
}

export default HomePage
