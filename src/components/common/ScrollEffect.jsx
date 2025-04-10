import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";

function ScrollEffect({
  children,
  direction = "up",
  delay = 0,
  threshold = 0.2,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  // Get transform value based on direction
  const getTransform = (dir) => {
    switch (dir) {
      case "up":
        return "translateY(50px)";
      case "down":
        return "translateY(-50px)";
      case "left":
        return "translateX(50px)";
      case "right":
        return "translateX(-50px)";
      default:
        return "translateY(50px)";
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Once triggered, disconnect observer
        }
      },
      { threshold }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [threshold]);

  return (
    <Box
      ref={elementRef}
      sx={{
        transform: isVisible ? "none" : getTransform(direction),
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.8s ease-out, opacity 0.8s ease-out`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </Box>
  );
}

export default ScrollEffect;
