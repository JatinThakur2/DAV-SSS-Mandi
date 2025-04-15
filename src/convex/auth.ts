// convex/auth.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// In a real app, use proper password hashing with bcrypt
// For simplicity, we're using a basic hash function here
function hashPassword(password: string): string {
  // This is just for demonstration purposes.
  // In a real app, use a secure password hashing library.
  return password + "_hashed";
}

export const signup = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new ConvexError("User already exists");
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      passwordHash: hashPassword(args.password),
      role: "admin", // Default role for now
      createdAt: Date.now(),
    });

    // Create session token
    const token = Math.random().toString(36).substring(2, 15);
    await ctx.db.insert("sessions", {
      userId,
      token,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      createdAt: Date.now(),
    });

    return { token, userId };
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Find user
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new ConvexError("Invalid credentials");
    }

    // Check password
    if (user.passwordHash !== hashPassword(args.password)) {
      throw new ConvexError("Invalid credentials");
    }

    // Create session token
    const token = Math.random().toString(36).substring(2, 15);
    await ctx.db.insert("sessions", {
      userId: user._id,
      token,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      createdAt: Date.now(),
    });

    return { token, userId: user._id, name: user.name, role: user.role };
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq("token", args.token))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }

    return { success: true };
  },
});

export const getMe = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    // Find session
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq("token", args.token))
      .first();

    if (!session || session.expiresAt < Date.now()) {
      return null;
    }

    // Find user
    const user = await ctx.db.get(session.userId);
    if (!user) {
      return null;
    }

    return {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
});
