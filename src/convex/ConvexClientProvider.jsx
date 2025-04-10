import React from "react";

// Mock provider until you set up Convex properly
const ConvexProvider = ({ children }) => {
  return <>{children}</>;
};

export default function ConvexClientProvider({ children }) {
  return <ConvexProvider>{children}</ConvexProvider>;
}
