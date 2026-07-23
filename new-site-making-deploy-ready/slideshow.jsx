// src/components/Slideshow.jsx
import { useState, useEffect } from 'react';

export default function Slideshow({ images, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) {
    return <div className="slideshow-placeholder">No images</div>;
  }

  return (
    <div className="slideshow-container">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          className={`slide-image ${index === currentIndex ? 'active' : ''}`}
          loading="lazy"
        />
      ))}
    </div>
  );
}