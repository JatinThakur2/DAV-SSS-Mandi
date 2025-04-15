// convex/scholarships.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getScholarships = query({
  args: { type: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.type) {
      return await ctx.db
        .query("scholarships")
        .filter((q: any) => q.eq("type", args.type))
        .collect();
    }
    return await ctx.db.query("scholarships").collect();
  },
});

export const addScholarship = mutation({
  args: {
    type: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    recipients: v.array(
      v.object({
        name: v.string(),
        details: v.string(),
        year: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("scholarships", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateScholarship = mutation({
  args: {
    id: v.id("scholarships"),
    type: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    recipients: v.array(
      v.object({
        name: v.string(),
        details: v.string(),
        year: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, data);
  },
});

export const deleteScholarship = mutation({
  args: { id: v.id("scholarships") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
