import React, { lazy } from "react";
// Lazy load pages to improve initial load performance
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const AdmissionPage = lazy(() => import("../pages/AdmissionPage"));
const StaffPage = lazy(() => import("../pages/StaffPage"));
const StudentZonePage = lazy(() => import("../pages/StudentZonePage"));
const GalleryPage = lazy(() => import("../pages/GalleryPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));

// Nested route components
const AboutDAV = lazy(() => import("../components/about/AboutDAV"));
const VisionMission = lazy(() => import("../components/about/VisionMission"));
const Facilities = lazy(() => import("../components/about/Facilities"));
const TeachingStaff = lazy(() => import("../components/staff/TeachingStaff"));
const NonTeachingStaff = lazy(
  () => import("../components/staff/NonTeachingStaff")
);
const AdmissionRules = lazy(
  () => import("../components/admission/AdmissionRules")
);
const FeeStructure = lazy(() => import("../components/admission/FeeStructure"));
const Scholarship = lazy(() => import("../components/student/Scholarship"));
const Results = lazy(() => import("../components/student/Results"));
// 404 Not Found Page Component
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
    children: [
      {
        path: "",
        element: <AboutDAV />, // Default child route
      },
      {
        path: "about-dav", // This matches the Navbar item "About DAV Mandi"
        element: <AboutDAV />,
      },
      {
        path: "vision-mission",
        element: <VisionMission />,
      },
      {
        path: "facilities",
        element: <Facilities />,
      },
    ],
  },
  {
    path: "/administration",
    element: <StaffPage />,
    children: [
      {
        path: "", // Default child route
        element: <TeachingStaff />,
      },
      {
        path: "teaching-staff",
        element: <TeachingStaff />,
      },
      {
        path: "non-teaching-staff",
        element: <NonTeachingStaff />,
      },
    ],
  },
  {
    path: "/admission",
    element: <AdmissionPage />,
    children: [
      {
        path: "", // Default child route
        element: <AdmissionRules />,
      },
      {
        path: "rules",
        element: <AdmissionRules />,
      },
      {
        path: "fee-structure",
        element: <FeeStructure />,
      },
    ],
  },
  {
    path: "/student-zone",
    element: <StudentZonePage />,
    children: [
      {
        path: "", // Default child route
        element: <Scholarship />,
      },
      {
        path: "scholarship",
        element: <Scholarship />,
      },
      {
        path: "results",
        element: <Results />,
      },
    ],
  },
  {
    path: "/gallery",
    element: <GalleryPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },

  // 404 Route
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
