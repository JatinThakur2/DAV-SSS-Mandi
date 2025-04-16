// convex/results.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Define the student data type with new fields
const studentSchema = v.object({
  position: v.string(),
  name: v.string(),
  marks: v.string(),
  totalMarks: v.optional(v.string()),
  percentage: v.optional(v.string()),
});

// Define the position object type with new fields
const positionSchema = v.object({
  name: v.string(),
  marks: v.string(),
  totalMarks: v.optional(v.string()),
  percentage: v.string(),
});

// Define the optional summary object with updated position fields
const summarySchema = v.optional(
  v.object({
    totalStudents: v.number(),
    passed: v.number(),
    result: v.string(),
    firstPosition: positionSchema,
    secondPosition: positionSchema,
  })
);

export const getResults = query({
  args: { year: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.year) {
      return await ctx.db
        .query("results")
        .filter((q) => q.eq(q.field("year"), args.year))
        .collect();
    }
    return await ctx.db.query("results").order("desc").collect();
  },
});

export const addResults = mutation({
  args: {
    year: v.string(),
    class: v.string(),
    data: v.array(studentSchema),
    summary: summarySchema,
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("results", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateResults = mutation({
  args: {
    id: v.id("results"),
    year: v.string(),
    class: v.string(),
    data: v.array(studentSchema),
    summary: summarySchema,
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, data);
  },
});

export const deleteResults = mutation({
  args: { id: v.id("results") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
