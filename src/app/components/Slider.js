import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick'; // Ensure this is installed
import 'slick-carousel/slick/slick.css'; // Import Slider CSS
import 'slick-carousel/slick/slick-theme.css'; // Import Slider Theme CSS

// Sample Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,        // Enable automatic sliding
  autoplaySpeed: 3000,   // Set the speed (in milliseconds) for automatic sliding
  arrows: false,         // Optional: Hide navigation arrows
};

const SliderComponent = ({ slides }) => {
  return (
    <div className="relative w-full h-full">
      <Slider {...sliderSettings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-96 md:h-128">
            <Image
              src={slide.image}
              alt={slide.alt}
              layout="fill"         // Fill parent container
              objectFit="cover"     // Cover the container without distortion
              className="absolute inset-0"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
