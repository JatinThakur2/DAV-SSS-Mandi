// convex/auth.js
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { ConvexError } from "convex/values";

// Note: In a production environment, we would use a proper password hashing solution
// For simplicity in this demo, we're using a basic hash function
function hashPassword(password) {
  // This is NOT secure for production - use bcrypt or similar in real applications
  return `hashed_${password}`;
}

// Login mutation
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  async handler(ctx, args) {
    const { email, password } = args;

    // Find the user by email
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email.toLowerCase()))
      .first();

    if (!user) {
      throw new ConvexError("Invalid email or password");
    }

    // Check password (in production, use proper password comparison)
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.passwordHash) {
      throw new ConvexError("Invalid email or password");
    }

    // Return user info (without password hash)
    const { passwordHash, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      userId: user._id,
      // In a real application, you'd generate a proper token
      token: `mocktoken_${user._id}`,
    };
  },
});

// Create a new admin user
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    role: v.string(),
  },
  async handler(ctx, args) {
    const { name, email, password, role } = args;

    // Validate input
    if (!name.trim()) {
      throw new ConvexError("Name is required");
    }

    if (!email.trim()) {
      throw new ConvexError("Email is required");
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ConvexError("Invalid email format");
    }

    if (!password || password.length < 6) {
      throw new ConvexError("Password must be at least 6 characters long");
    }

    if (!role || !["admin", "editor", "viewer"].includes(role)) {
      throw new ConvexError("Invalid role");
    }

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email.toLowerCase()))
      .first();

    if (existingUser) {
      throw new ConvexError("User with this email already exists");
    }

    // Hash the password
    const passwordHash = hashPassword(password);

    // Create the user
    const userId = await ctx.db.insert("users", {
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return {
      userId,
      success: true,
      message: "User created successfully",
    };
  },
});

// Get current user info
export const getCurrentUser = query({
  args: { userId: v.optional(v.id("users")) },
  async handler(ctx, args) {
    const { userId } = args;

    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (!user) return null;

    // Don't return the password hash
    const { passwordHash, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      _id: userId,
    };
  },
});

// Create an initial admin user (helpful for setup)
export const createInitialAdmin = mutation({
  args: {},
  async handler(ctx) {
    // Check if any users exist
    const existingUsers = await ctx.db.query("users").take(1);

    // If we already have users, don't create the initial admin
    if (existingUsers.length > 0) {
      return { message: "Admin users already exist" };
    }

    // Create initial admin user with email: admin@davsss.edu.in and password: admin
    const adminId = await ctx.db.insert("users", {
      name: "DAV Admin",
      email: "admin@davsss.edu.in",
      passwordHash: hashPassword("admin"), // Simple password for demo - secure in production!
      role: "admin",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return {
      message: "Initial admin created",
      adminId,
    };
  },
});
