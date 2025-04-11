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

  // Authentication mutations
  if (mutationFunction === "auth:createUser") {
    return async (args) => {
      console.log(`Creating user with args:`, args);

      // Check if email is already taken (mock implementation)
      if (args.email === "admin@davsss.edu.in") {
        throw new Error("User with this email already exists");
      }

      // Simulate successful user creation
      return {
        userId: `user_${Date.now()}`,
        success: true,
      };
    };
  }

  if (mutationFunction === "auth:login") {
    return async (args) => {
      console.log(`Logging in user with args:`, args);

      // Mock login implementation
      if (args.email === "admin@davsss.edu.in" && args.password === "admin") {
        return {
          userId: "admin-user-id",
          token: "mock-token-" + Date.now(),
          name: "DAV Admin",
          email: args.email,
          role: "admin",
        };
      } else {
        throw new Error("Invalid email or password");
      }
    };
  }

  // Default behavior for other mutations
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
