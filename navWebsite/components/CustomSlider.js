import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    id: 1,
    image: "/assets/img/fo3.jpg",
    title: "Get the best travel experience",
    subtitle:
      "Embark on unforgettable journeys with tailored itineraries, premium services, and stress-free planning.",
    number: "02",
  },
  {
    id: 2,
    image: "/assets/img/fo1.jpg",
    title: "Choose your next flight with ease",
    subtitle:
      "Simplify your travel plans with curated flight options and expert support for a seamless booking experience.",
    number: "03",
  },
  {
    id: 3,
    image: "/assets/img/fo2.jpg",
    title: "Easiest flight search solutions",
    subtitle: "Discover flights that match your schedule and budget instantly, with advanced tools designed for your convenience.",
    number: "04",
  },
];

const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          // right: "28px",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-center",
          justifyContent:"center",
          gap: "8px",
          bottom: "15px",
        }}
      >
        {dots}
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          border: "2px solid transparent",
          transition: "all 0.3s ease",
        }}
      />
    ),
  };

  return (
    <div style={{ position: "relative", margin: "auto" }}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              style={{
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "30px",
                  color: "#fff",
                  zIndex: 2,
                }}
              >
                {/* <h1 style={{ margin: 0, fontSize: "50px", fontWeight: "bold" }}>
                  {slide.number}
                </h1> */}
                <h2 style={{ margin: "10px 0 5px", fontSize: "24px" }}>
                  {slide.title}
                </h2>
                <p style={{ margin: 0 }}>{slide.subtitle}</p>
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
              />
            </div>
          </div>
        ))}
      </Slider>
      <style>
        {`
          .slick-dots li {
            margin: 0;
            width: auto;
          }

          .slick-dots li.slick-active div {
            background-color: #fff !important;
            border: 2px solid #fff;
          }
        `}
      </style>
    </div>
  );
};

export default CustomSlider;
