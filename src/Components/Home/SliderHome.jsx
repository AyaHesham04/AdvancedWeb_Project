import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import slider1 from '../../images/slider1.jpg';
import slider2 from '../../images/slider2.jpg';
import slider3 from '../../images/slider3.jpg';
import slider4 from '../../images/slider4.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliders } from '../../redux/slices/sliderSlice';

const SliderHome = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    // Corrected sliderImages array with direct image imports
    const sliderImages = [
        { name: 'first slide', image: slider1 },
        { name: 'second slide', image: slider2 },
        { name: 'third slide', image: slider3 },
        { name: 'fourth slide', image: slider4 },
    ];

    // const dispatch = useDispatch();
    // const { items: sliderImages, loading, error } = useSelector((state) => state.slider);
    // console.log(sliderImages.map((item, index) => (
    //     item.image

    // )));
    // useEffect(() => {
    //     dispatch(fetchSliders());
    // }, [dispatch]);

    useEffect(() => {
        const slider = document.querySelector('.slick-slider');
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

            slider.addEventListener('touchmove', onTouchMove);
            return () => slider.removeEventListener('touchmove', onTouchMove);
        };

        slider.addEventListener('touchstart', preventVerticalScroll);
        return () => slider.removeEventListener('touchstart', preventVerticalScroll);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: '0px',
        swipe: true,
        touchMove: true,
        touchThreshold: 10,
        swipeToSlide: true,
        cssEase: 'ease-in-out',
        pauseOnHover: true,
        pauseOnDotsHover: true,
    };

    return (
        <div className="mt-n14 w-100 overflow-hidden">
            <Slider {...settings}>
                {sliderImages.map((item, index) => (
                    <div
                        key={index}
                        className="d-flex flex-row justify-content-center align-items-center"
                    >
                        <img className="slider-img" src={item.image} alt={item.name} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderHome;
