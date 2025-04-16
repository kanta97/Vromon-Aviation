import React, { useState, useEffect } from "react";
import styles from './campaign.module.css'
const Slider = ({ slides, autoplayInterval = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === slides?.length - 1 ? 0 : prevIndex + 1
      );
    }, autoplayInterval);

    return () => clearInterval(intervalId);
  }, [autoplayInterval, slides?.length]);

  return (
    <div className= {` ${styles.slideshow_camp}`}>
      <div
        className={`slideshowSlider ${styles.slideshowSlider}`}
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slides &&
          slides.map((slide, idx) => (
            <div className= {` ${styles.slide}`} key={idx}>
              <img src={slide.headerImg} alt={`Slide ${idx + 1}`} />
            </div>
          ))}
      </div>

      <div className= {` ${styles.slideshowDots}`}>
        {slides &&
          slides.map((_, idx) => (
            <div
              key={idx}
              className={`  ${styles.slideshowDot} ${index === idx ? " active" : ""}`}
              onClick={() => setIndex(idx)}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default Slider;
