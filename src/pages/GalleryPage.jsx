import React from "react";
import SchoolGallery from "../components/gallery/SchoolGallery";
import PageHeader from "../components/common/PageHeader";

function GalleryPage() {
  return (
    <>
      <PageHeader
        title="School Gallery"
        subtitle="Explore photos and memories from our school events and activities."
        bgImage="/api/placeholder/1920/400" // Replace with actual school event image
      />
      <SchoolGallery />
    </>
  );
}

export default GalleryPage;
