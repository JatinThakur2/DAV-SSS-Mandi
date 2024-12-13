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
const NonTeachingStaff = lazy(() =>
  import("../components/staff/NonTeachingStaff")
);
const AdmissionRules = lazy(() =>
  import("../components/admission/AdmissionRules")
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
    path: "/AboutPage",
    element: <AboutPage />,
    children: [
      {
        path: "AboutDAV",
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
