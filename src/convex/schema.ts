import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // News table for latest news and announcements - Updated with link field
  news: defineTable({
    title: v.string(),
    date: v.string(),
    description: v.string(),
    isNotice: v.boolean(), // To differentiate between news and notices
    link: v.optional(v.string()), // Added link field (optional)
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),

  // Updated results schema with additional fields for totalMarks and percentage
  results: defineTable({
    year: v.string(),
    class: v.string(), // "10", "12Arts", "12Science", "12Commerce"
    data: v.array(
      v.object({
        position: v.string(),
        name: v.string(),
        marks: v.string(),
        totalMarks: v.optional(v.string()), // New field for total possible marks
        percentage: v.optional(v.string()), // New field for calculated percentage
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
          totalMarks: v.optional(v.string()), // New field for total marks
          percentage: v.string(),
        }),
        secondPosition: v.object({
          name: v.string(),
          marks: v.string(),
          totalMarks: v.optional(v.string()), // New field for total marks
          percentage: v.string(),
        }),
      })
    ),
    createdAt: v.number(),
  }).index("by_year", ["year"]),

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

  galleryEvents: defineTable({
    title: v.string(),
    date: v.string(),
    description: v.string(),
    thumbnail: v.string(), // URL of the thumbnail image
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),

  galleryImages: defineTable({
    eventId: v.id("galleryEvents"),
    imageUrl: v.string(),
    caption: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_event", ["eventId"]),

  users: defineTable({
    email: v.string(),
    name: v.string(),
    passwordHash: v.string(),
    role: v.string(), // "admin", "editor", etc.
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  // House system general information
  houseInfo: defineTable({
    title: v.string(),
    description: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  // School presidium (leadership) - Updated with positionType field
  schoolPresidium: defineTable({
    position: v.string(), // The full position name (e.g., "HEAD BOY", "SCHOOL CAPTAIN (GIRL)")
    positionType: v.optional(v.string()), // New field: "head-boy", "head-girl", "captain-boy", "captain-girl", "other"
    name: v.string(),
    year: v.string(), // e.g., "2023-2024"
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_year", ["year"])
    .index("by_position_type", ["positionType"]), // New index for querying by position type

  // Houses data
  houses: defineTable({
    name: v.string(), // e.g., "GANDHI HOUSE", "NEHRU HOUSE"
    captainBoy: v.string(),
    captainGirl: v.string(),
    houseTeacher: v.string(),
    color: v.optional(v.string()), // Color associated with the house
    imageUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_name", ["name"]),

  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_user", ["userId"]),
});
