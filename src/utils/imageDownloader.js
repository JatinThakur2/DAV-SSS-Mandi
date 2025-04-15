// src/utils/imageDownloader.js
import JSZip from "jszip";
import { saveAs } from "file-saver";

/**
 * Downloads a single image
 * @param {string} imageUrl - URL of the image to download
 * @param {string} filename - Name to save the file as (optional)
 */
export const downloadSingleImage = async (imageUrl, filename) => {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Network response was not ok");

    const blob = await response.blob();

    // Generate a filename if not provided
    const defaultFilename = filename || `image-${Date.now()}.jpg`;

    // Create a download link and trigger the download
    saveAs(blob, defaultFilename);
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
};

/**
 * Downloads multiple images as a zip file
 * @param {Array<string>} imageUrls - Array of image URLs to download
 * @param {string} zipFilename - Name for the zip file (optional)
 * @param {Array<string>} filenames - Array of filenames to use (optional)
 */
export const downloadImagesAsZip = async (
  imageUrls,
  zipFilename = "images.zip",
  filenames = []
) => {
  try {
    if (!imageUrls || imageUrls.length === 0) {
      throw new Error("No images to download");
    }

    // Create a new JSZip instance
    const zip = new JSZip();

    // Create a folder for the images
    const imgFolder = zip.folder("images");

    // Fetch all images and add them to the zip
    const imagePromises = imageUrls.map(async (url, index) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch image at ${url}`);

        const blob = await response.blob();

        // Use provided filename or generate one
        const filename = filenames[index] || `image-${index + 1}.jpg`;

        // Add the image to the zip
        imgFolder.file(filename, blob);

        return true;
      } catch (error) {
        console.error(`Error processing image ${index}:`, error);
        return false;
      }
    });

    // Wait for all images to be processed
    await Promise.all(imagePromises);

    // Generate the zip file
    const content = await zip.generateAsync(
      {
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 6, // Moderate compression level
        },
      },
      (metadata) => {
        // You can use metadata.percent to update a progress bar if needed
        console.log(
          `Zip generation progress: ${Math.round(metadata.percent)}%`
        );
      }
    );

    // Trigger the download
    saveAs(content, zipFilename);

    return true;
  } catch (error) {
    console.error("Error creating zip file:", error);
    throw error;
  }
};

/**
 * Helper function to extract filename from URL
 * @param {string} url - Image URL
 * @returns {string} - Extracted filename or default
 */
export const getFilenameFromUrl = (url) => {
  if (!url) return "image.jpg";

  // Try to extract the filename from URL
  const pathSegments = url.split("/");
  let filename = pathSegments[pathSegments.length - 1];

  // Remove query parameters if any
  if (filename.includes("?")) {
    filename = filename.split("?")[0];
  }

  // If no extension, add .jpg
  if (!filename.includes(".")) {
    filename += ".jpg";
  }

  return filename || "image.jpg";
};

/**
 * Downloads all images from an event
 * @param {Array<Object>} images - Array of image objects with imageUrl and caption
 * @param {string} eventTitle - Title of the event
 */
export const downloadEventImages = async (images, eventTitle = "Event") => {
  if (!images || images.length === 0) {
    throw new Error("No images to download");
  }

  // Extract URLs and generate filenames from captions or indices
  const imageUrls = images.map((img) => img.imageUrl);
  const filenames = images.map((img, index) => {
    const baseFilename = img.caption
      ? img.caption.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      : `image_${index + 1}`;
    return `${baseFilename}.jpg`;
  });

  // Create the zip filename from event title
  const zipFilename = `${eventTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_images.zip`;

  // Download the zip
  return await downloadImagesAsZip(imageUrls, zipFilename, filenames);
};
