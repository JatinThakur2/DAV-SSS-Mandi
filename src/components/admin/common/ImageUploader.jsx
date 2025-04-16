// src/components/admin/common/ImageUploader.jsx
import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

function ImageUploader({ onImageUpload, currentImage = null }) {
  const [uploading, setUploading] = useState(false);

  // Convex mutations for handling file uploads
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveFileInfo = useMutation(api.files.saveFileInfo);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      // Get upload URL
      const uploadUrl = await generateUploadUrl();

      // Upload file
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) throw new Error("Upload failed");

      // Get storage ID
      const { storageId } = await result.json();

      // Save file info
      const fileInfo = await saveFileInfo({
        storageId,
        fileName: file.name,
        fileType: file.type,
      });

      // Pass URL to parent
      onImageUpload(fileInfo.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      {currentImage && (
        <Box sx={{ mb: 2 }}>
          <img
            src={currentImage}
            alt="Current"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              objectFit: "contain",
            }}
          />
        </Box>
      )}

      <Button
        variant="outlined"
        component="label"
        startIcon={uploading ? <CircularProgress size={20} /> : <ImageIcon />}
        disabled={uploading}
      >
        {currentImage ? "Change Image" : "Upload Image"}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  );
}

export default ImageUploader;
