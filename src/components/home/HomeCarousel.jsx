// src/components/home/HomeCarousel.jsx
import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ArrowForward as ArrowIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import OmLogo from "../common/OmLogo";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function HomeCarousel() {
  const slides = [
    {
      bgColor: "#1E4A86", // Deep blue background
      title: "Welcome to DAV SSS Mandi",
      subtitle: "Empowering young minds through quality education",
      description:
        "Providing holistic education with a blend of traditional values and modern teaching methods since 1944.",
      buttonText: "Explore Our School",
      buttonLink: "/about/about-dav",
      showOm: true,
    },
    {
      bgColor: "#FF6B00", // Saffron background
      title: "Academic Excellence",
      subtitle: "Nurturing talent and fostering growth",
      description:
        "Our institution focuses on academic rigor, intellectual development, and practical knowledge.",
      buttonText: "View Results",
      buttonLink: "/student-zone/results",
      showOm: false,
    },
    {
      bgColor: "#2A7E43", // Green background
      title: "Holistic Development",
      subtitle: "Beyond academics - building future leaders",
      description:
        "We offer a comprehensive educational experience focusing on character development and overall personal growth.",
      buttonText: "Our Facilities",
      buttonLink: "/about/facilities",
      showOm: true,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "600px", md: "80vh" },
        position: "relative",
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        effect="fade"
        speed={1000}
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: "relative",
                height: "100%",
                width: "100%",
                backgroundColor: slide.bgColor,
                display: "flex",
                alignItems: "center",
                color: "white",
                overflow: "hidden",
              }}
            >
              {/* Background pattern */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.05,
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
              />

              {slide.showOm && (
                <Box
                  sx={{
                    position: "absolute",
                    right: { xs: -100, md: -150 },
                    bottom: { xs: -100, md: -150 },
                    opacity: 0.1,
                  }}
                >
                  <OmLogo
                    sx={{ fontSize: { xs: 300, md: 400 }, color: "white" }}
                  />
                </Box>
              )}

              <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={7}>
                    <Box
                      sx={{
                        textAlign: "left",
                        animation: "fadeInUp 1s ease",
                        "@keyframes fadeInUp": {
                          "0%": {
                            opacity: 0,
                            transform: "translateY(20px)",
                          },
                          "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                          },
                        },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 500,
                          mb: 1,
                          backgroundColor: "rgba(255,255,255,0.15)",
                          borderRadius: 5,
                          display: "inline-block",
                          px: 2,
                          py: 0.5,
                        }}
                      >
                        {slide.subtitle}
                      </Typography>
                      <Typography
                        variant="h2"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
                          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          lineHeight: 1.2,
                        }}
                      >
                        {slide.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 4,
                          fontWeight: 400,
                          maxWidth: "600px",
                          fontSize: { xs: "1rem", md: "1.25rem" },
                        }}
                      >
                        {slide.description}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link}
                        to={slide.buttonLink}
                        endIcon={<ArrowIcon />}
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          py: 1.5,
                          backgroundColor: "white",
                          color: slide.bgColor,
                          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.9)",
                          },
                        }}
                      >
                        {slide.buttonText}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default HomeCarousel;
