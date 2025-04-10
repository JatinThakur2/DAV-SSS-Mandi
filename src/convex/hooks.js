// src/convex/hooks.js
// This file provides mock Convex hooks until the real ones are properly generated

// Mock query hook
export const useQuery = (queryFunction, args) => {
  // Return null or mock data depending on the query
  console.warn(`Mock useQuery called with:`, queryFunction, args);

  // Return empty arrays for collection queries
  if (queryFunction.includes("getAll")) {
    return [];
  }

  // Return null for individual item queries
  return null;
};

// Mock mutation hook
export const useMutation = (mutationFunction) => {
  // Return a function that logs the calls but doesn't actually mutate anything
  console.warn(`Mock useMutation called with:`, mutationFunction);
  return async (args) => {
    console.log(`Mock mutation called with args:`, args);
    return { success: true };
  };
};

// Mock action hook
export const useAction = (actionFunction) => {
  // Return a function that logs the calls
  console.warn(`Mock useAction called with:`, actionFunction);
  return async (args) => {
    console.log(`Mock action called with args:`, args);
    return null;
  };
};
