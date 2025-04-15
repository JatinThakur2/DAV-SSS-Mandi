import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // News table for latest news and announcements
  news: defineTable({
    title: v.string(),
    date: v.string(),
    description: v.string(),
    isNotice: v.boolean(), // To differentiate between news and notices
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),

  // Results table for student results
  results: defineTable({
    year: v.string(),
    class: v.string(), // "10", "12Arts", "12Science", "12Commerce"
    data: v.array(
      v.object({
        position: v.string(),
        name: v.string(),
        marks: v.string(),
      })
    ),
    summary: v.optional(
      v.object({
        totalStudents: v.number(),
        passed: v.number(),
        result: v.string(),
        firstPosition: v.object({
          name: v.string(),
          marks: v.string(),
          percentage: v.string(),
        }),
        secondPosition: v.object({
          name: v.string(),
          marks: v.string(),
          percentage: v.string(),
        }),
      })
    ),
    createdAt: v.number(),
  }).index("by_year", ["year"]),

  // Scholarships table for scholarship information
  scholarships: defineTable({
    type: v.string(), // "government" or "private"
    name: v.string(),
    description: v.optional(v.string()),
    recipients: v.array(
      v.object({
        name: v.string(),
        details: v.string(),
        year: v.string(),
      })
    ),
    createdAt: v.number(),
  }).index("by_type", ["type"]),

  // Gallery events table
  galleryEvents: defineTable({
    title: v.string(),
    date: v.string(),
    description: v.string(),
    thumbnail: v.string(), // URL of the thumbnail image
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),

  // Gallery images table
  galleryImages: defineTable({
    eventId: v.id("galleryEvents"),
    imageUrl: v.string(),
    caption: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_event", ["eventId"]),

  // Users table for admin authentication
  users: defineTable({
    email: v.string(),
    name: v.string(),
    passwordHash: v.string(),
    role: v.string(), // "admin", "editor", etc.
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  // Sessions table for authentication
  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_user", ["userId"]),
});

// Note: Removed duplicate code that was in this file
// You should keep the functions in their respective files (results.ts, etc.)
