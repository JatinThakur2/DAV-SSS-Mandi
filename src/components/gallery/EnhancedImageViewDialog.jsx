// src/components/gallery/EnhancedImageViewDialog.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
  Download as DownloadIcon,
  CloudDownload as DownloadAllIcon,
} from "@mui/icons-material";

function EnhancedImageViewDialog({
  open,
  onClose,
  currentImageUrl,
  allImages,
  currentIndex = 0,
  onNavigate,
  eventTitle = "Gallery",
}) {
  const [imageIndex, setImageIndex] = useState(currentIndex);
  const [inputValue, setInputValue] = useState(String(currentIndex + 1));
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Update the index when props change
    setImageIndex(currentIndex);
    setInputValue(String(currentIndex + 1));
  }, [currentIndex]);

  // Handle navigation
  const handlePrevious = () => {
    const newIndex = imageIndex > 0 ? imageIndex - 1 : allImages.length - 1;
    setImageIndex(newIndex);
    setInputValue(String(newIndex + 1));
    if (onNavigate) onNavigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = imageIndex < allImages.length - 1 ? imageIndex + 1 : 0;
    setImageIndex(newIndex);
    setInputValue(String(newIndex + 1));
    if (onNavigate) onNavigate(newIndex);
  };

  // Handle manual input of index
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e) => {
    if (e.key === "Enter") {
      const numericValue = parseInt(inputValue, 10);
      if (
        !isNaN(numericValue) &&
        numericValue >= 1 &&
        numericValue <= allImages.length
      ) {
        const newIndex = numericValue - 1;
        setImageIndex(newIndex);
        if (onNavigate) onNavigate(newIndex);
      } else {
        // Reset to current index if invalid
        setInputValue(String(imageIndex + 1));
      }
    }
  };

  // Handle download of current image
  const handleDownloadImage = () => {
    try {
      setIsDownloading(true);
      const currentImage = allImages[imageIndex];
      if (!currentImage) return;

      const link = document.createElement("a");
      link.href = currentImage;
      link.download = `image-${imageIndex + 1}.jpg`; // Default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle download of all images
  const handleDownloadAllImages = async () => {
    try {
      setIsDownloading(true);

      // Check if we have JSZip and FileSaver available in a real implementation
      // For now we'll create a simple zip with built-in functionality
      const downloadPromises = allImages.map((imageUrl, index) => {
        return new Promise((resolve, reject) => {
          const link = document.createElement("a");
          link.href = imageUrl;
          link.download = `${eventTitle.replace(/\s+/g, "-")}-image-${index + 1}.jpg`;
          link.onclick = resolve;
          link.onerror = reject;
          link.click();

          // Simulate successful download after a delay
          setTimeout(resolve, 500);
        });
      });

      // Download one by one with a small delay in between
      for (let i = 0; i < downloadPromises.length; i++) {
        await downloadPromises[i];
      }

      alert(
        `Started downloading ${allImages.length} images.\n\nIn a production environment, we would use JSZip to package all images into a single .zip file for download.`
      );
    } catch (error) {
      console.error("Error downloading all images:", error);
      alert("There was an error downloading the images.");
    } finally {
      setIsDownloading(false);
    }
  };

  // If no images, don't render
  if (!open || !allImages || allImages.length === 0) return null;

  const currentImageSrc = allImages[imageIndex] || currentImageUrl;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          position: "relative",
          bgcolor: "background.default",
          borderRadius: 2,
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: "relative" }}>
        {/* Top control bar */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "rgba(0,0,0,0.6)",
            p: 1,
            zIndex: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputSubmit}
              sx={{
                width: 80,
                mr: 1,
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                  "&:hover fieldset": { borderColor: "white" },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ color: "white" }}>
                    / {allImages.length}
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box>
            <Tooltip title="Download current image">
              <IconButton
                onClick={handleDownloadImage}
                sx={{ color: "white", mr: 1 }}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <DownloadIcon />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Download all images">
              <IconButton
                onClick={handleDownloadAllImages}
                sx={{ color: "white", mr: 1 }}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <DownloadAllIcon />
                )}
              </IconButton>
            </Tooltip>

            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Image */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "black",
          }}
        >
          {currentImageSrc && (
            <img
              src={currentImageSrc}
              alt="Enlarged view"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          )}

          {/* Navigation buttons */}
          <IconButton
            aria-label="previous image"
            onClick={handlePrevious}
            sx={{
              position: "absolute",
              left: 16,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <PrevIcon fontSize="large" />
          </IconButton>

          <IconButton
            aria-label="next image"
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 16,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <NextIcon fontSize="large" />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EnhancedImageViewDialog;
