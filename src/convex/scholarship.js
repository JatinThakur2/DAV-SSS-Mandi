// convex/scholarship.js
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Get all scholarships
export const getAllScholarships = query({
  async handler(ctx) {
    return await ctx.db.query("scholarships").order("desc").collect();
  },
});

// Get scholarships by type and academic year
export const getScholarshipsByTypeAndYear = query({
  args: {
    type: v.string(),
    academicYear: v.string(),
  },
  async handler(ctx, args) {
    const { type, academicYear } = args;
    return await ctx.db
      .query("scholarships")
      .withIndex("by_type_and_year", (q) =>
        q.eq("type", type).eq("academicYear", academicYear)
      )
      .collect();
  },
});

// Get scholarship by ID
export const getScholarshipById = query({
  args: { id: v.id("scholarships") },
  async handler(ctx, args) {
    const scholarship = await ctx.db.get(args.id);
    if (!scholarship) {
      throw new ConvexError("Scholarship not found");
    }
    return scholarship;
  },
});

// Get all recipients for a scholarship
export const getRecipientsByScholarship = query({
  args: { scholarshipId: v.id("scholarships") },
  async handler(ctx, args) {
    return await ctx.db
      .query("scholarshipRecipients")
      .withIndex("by_scholarship", (q) =>
        q.eq("scholarshipId", args.scholarshipId)
      )
      .collect();
  },
});

// Get all recipients for a specific academic year
export const getRecipientsByYear = query({
  args: { academicYear: v.string() },
  async handler(ctx, args) {
    return await ctx.db
      .query("scholarshipRecipients")
      .filter((q) => q.eq(q.field("academicYear"), args.academicYear))
      .collect();
  },
});

// Create a new scholarship
export const createScholarship = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    type: v.string(),
    academicYear: v.string(),
  },
  async handler(ctx, args) {
    const { name, description, type, academicYear } = args;

    const scholarshipId = await ctx.db.insert("scholarships", {
      name,
      description: description || "",
      type,
      academicYear,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { scholarshipId };
  },
});

// Update a scholarship
export const updateScholarship = mutation({
  args: {
    id: v.id("scholarships"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    type: v.optional(v.string()),
    academicYear: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const { id, name, description, type, academicYear } = args;

    // Check if scholarship exists
    const existingScholarship = await ctx.db.get(id);
    if (!existingScholarship) {
      throw new ConvexError("Scholarship not found");
    }

    // Update only the provided fields
    const updates = {
      updatedAt: Date.now(),
    };

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (type !== undefined) updates.type = type;
    if (academicYear !== undefined) updates.academicYear = academicYear;

    await ctx.db.patch(id, updates);

    return { success: true };
  },
});

// Delete a scholarship
export const deleteScholarship = mutation({
  args: { id: v.id("scholarships") },
  async handler(ctx, args) {
    // Check if scholarship exists
    const existingScholarship = await ctx.db.get(args.id);
    if (!existingScholarship) {
      throw new ConvexError("Scholarship not found");
    }

    // Get all recipients for this scholarship
    const recipients = await ctx.db
      .query("scholarshipRecipients")
      .withIndex("by_scholarship", (q) => q.eq("scholarshipId", args.id))
      .collect();

    // Delete all recipients first
    for (const recipient of recipients) {
      await ctx.db.delete(recipient._id);
    }

    // Then delete the scholarship
    await ctx.db.delete(args.id);

    return { success: true };
  },
});

// Add a scholarship recipient
export const addRecipient = mutation({
  args: {
    scholarshipId: v.id("scholarships"),
    studentName: v.string(),
    class: v.optional(v.string()),
    amount: v.optional(v.string()),
    details: v.optional(v.string()),
    academicYear: v.string(),
  },
  async handler(ctx, args) {
    const {
      scholarshipId,
      studentName,
      class: studentClass,
      amount,
      details,
      academicYear,
    } = args;

    // Check if scholarship exists
    const scholarship = await ctx.db.get(scholarshipId);
    if (!scholarship) {
      throw new ConvexError("Scholarship not found");
    }

    const recipientId = await ctx.db.insert("scholarshipRecipients", {
      scholarshipId,
      studentName,
      class: studentClass || "",
      amount: amount || "",
      details: details || "",
      academicYear,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { recipientId };
  },
});

// Update a scholarship recipient
export const updateRecipient = mutation({
  args: {
    id: v.id("scholarshipRecipients"),
    studentName: v.optional(v.string()),
    class: v.optional(v.string()),
    amount: v.optional(v.string()),
    details: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const { id, studentName, class: studentClass, amount, details } = args;

    // Check if recipient exists
    const existingRecipient = await ctx.db.get(id);
    if (!existingRecipient) {
      throw new ConvexError("Scholarship recipient not found");
    }

    // Update only the provided fields
    const updates = {
      updatedAt: Date.now(),
    };

    if (studentName !== undefined) updates.studentName = studentName;
    if (studentClass !== undefined) updates.class = studentClass;
    if (amount !== undefined) updates.amount = amount;
    if (details !== undefined) updates.details = details;

    await ctx.db.patch(id, updates);

    return { success: true };
  },
});

// Delete a scholarship recipient
export const deleteRecipient = mutation({
  args: { id: v.id("scholarshipRecipients") },
  async handler(ctx, args) {
    // Check if recipient exists
    const existingRecipient = await ctx.db.get(args.id);
    if (!existingRecipient) {
      throw new ConvexError("Scholarship recipient not found");
    }

    await ctx.db.delete(args.id);

    return { success: true };
  },
});
