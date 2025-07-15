import React, { useState, useEffect } from 'react';

const slides = [
  { id: 1, image: '/slider1.png' },
  { id: 2, image: '/slider2.png' },
  { id: 3, image: '/slider3.png' },
  { id: 4, image: '/slider4.png' },
];

const FeaturedCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>

          <h2
        className="text-2xl font-bold mb-4 text-center text-purple-500 mt-[34px] text-transparent bg-clip-text"
        style={{
          backgroundImage: 'linear-gradient(to bottom, #FF13EB 0%, #00A75E 100%)',
        }}> Nổi bật
          </h2>

      <div className="relative w-full h-[420px] rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
        {slides.map((slide, idx) => (
          <img
            key={slide.id}
            src={slide.image}
            alt=""
            className={`absolute max-w-full max-h-full transition-opacity duration-1000 ${
              idx === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectFit: 'contain' }} // 👈 giữ nguyên ảnh, không bị crop
          />
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-2 space-x-2">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === current ? 'bg-purple-500' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
