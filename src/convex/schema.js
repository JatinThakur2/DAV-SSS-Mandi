// convex/schema.js
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users collection for admin authentication
  users: defineTable({
    name: v.string(),
    email: v.string(),
    passwordHash: v.string(),
    role: v.string(), // admin, editor, etc.
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  // News articles collection
  news: defineTable({
    title: v.string(),
    content: v.string(),
    date: v.number(), // Timestamp
    publishedBy: v.string(),
    isPublished: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_date", ["date"]),

  // Notices collection
  notices: defineTable({
    title: v.string(),
    content: v.string(),
    date: v.number(), // Timestamp
    publishedBy: v.string(),
    isImportant: v.boolean(),
    isPublished: v.boolean(),
    expiryDate: v.optional(v.number()), // Optional expiry date
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_date", ["date"]),

  // Teaching staff collection
  teachingStaff: defineTable({
    name: v.string(),
    designation: v.string(),
    qualification: v.string(),
    experience: v.string(),
    subject: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
    order: v.number(), // For display order
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_designation", ["designation"]),

  // Non-teaching staff collection
  nonTeachingStaff: defineTable({
    name: v.string(),
    designation: v.string(),
    qualification: v.string(),
    experience: v.string(),
    department: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
    order: v.number(), // For display order
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_designation", ["designation"]),

  // Fee structure collection
  feeStructure: defineTable({
    academicYear: v.string(), // e.g., "2025-2026"
    class: v.string(), // e.g., "Nursery", "I", "X", "XII (Science)"
    tuitionFee: v.number(),
    ipFee: v.optional(v.number()),
    totalWithIP: v.optional(v.number()),
    totalWithoutIP: v.optional(v.number()),
    isNewStudent: v.boolean(), // Whether for new or existing students
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_year_and_class", ["academicYear", "class"]),

  // Scholarships collection
  scholarships: defineTable({
    name: v.string(), // Scholarship name
    description: v.optional(v.string()),
    type: v.string(), // e.g., "government" or "private"
    academicYear: v.string(), // e.g., "2024-2025"
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_type_and_year", ["type", "academicYear"]),

  // Scholarship recipients collection
  scholarshipRecipients: defineTable({
    scholarshipId: v.id("scholarships"),
    studentName: v.string(),
    class: v.optional(v.string()),
    amount: v.optional(v.string()),
    details: v.optional(v.string()),
    academicYear: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_scholarship", ["scholarshipId"]),

  // Academic results collection
  academicResults: defineTable({
    academicYear: v.string(),
    examType: v.string(), // e.g., "Annual", "Half-yearly"
    class: v.string(), // e.g., "X", "XII-Science"
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_year_and_class", ["academicYear", "class"]),

  // Top performers collection
  topPerformers: defineTable({
    resultId: v.id("academicResults"),
    name: v.string(),
    position: v.string(), // e.g., "1st", "2nd"
    marks: v.string(),
    percentage: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_result", ["resultId"]),

  // Result statistics collection
  resultStatistics: defineTable({
    resultId: v.id("academicResults"),
    totalStudents: v.number(),
    passed: v.number(),
    percentageResult: v.string(), // e.g., "100%"
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  // Gallery events collection
  galleryEvents: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.number(), // Timestamp
    academicYear: v.string(),
    coverImageUrl: v.optional(v.string()),
    publishedBy: v.string(),
    isPublished: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_date", ["date"]),

  // Gallery images collection
  galleryImages: defineTable({
    eventId: v.id("galleryEvents"),
    imageUrl: v.string(),
    caption: v.optional(v.string()),
    order: v.number(), // For display order
    uploadedBy: v.string(),
    createdAt: v.number(),
  }).index("by_event", ["eventId"]),
});
