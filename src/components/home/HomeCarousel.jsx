import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function HomeCarousel() {
  const slides = [
    {
      // image: "/images/school-campus-1.jpg",
      title: "Welcome to DAV SSS Mandi",
      description: "Empowering young minds through quality education",
    },
    {
      // image: "/images/school-event.jpg",
      title: "Academic Excellence",
      description: "Nurturing talent and fostering growth",
    },
    {
      // image: "/images/student-activities.jpg",
      title: "Holistic Development",
      description: "Beyond academics - building future leaders",
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "500px" }}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: "relative",
                height: "500px",
                width: "100%",
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1, px: 3 }}>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                >
                  {slide.description}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default HomeCarousel;
