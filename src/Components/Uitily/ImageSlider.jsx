/* ImageSlider.js */
import React, { useState } from 'react';
import './css/ImageSlider.css';

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transformOrigin, setTransformOrigin] = useState('center center');

    const selectImage = (index) => {
        setCurrentIndex(index);
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setTransformOrigin(`${x}% ${y}%`);
    };

    const handleMouseLeave = () => {
        setTransformOrigin('center center');
    };

    return (
        <div className="image-slider">
            <div
                className="main-image"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={images[currentIndex].original}
                    alt={`Slide ${currentIndex + 1}`}
                    style={{ transformOrigin }}
                />
            </div>
            <div className="thumbnails">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img.original}
                        alt={`Thumbnail ${idx + 1}`}
                        className={idx === currentIndex ? 'active' : ''}
                        onClick={() => selectImage(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;

