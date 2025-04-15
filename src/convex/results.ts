// convex/results.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getResults = query({
  args: { year: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.year) {
      return await ctx.db
        .query("results")
        .filter((q: any) => q.eq("year", args.year))
        .collect();
    }
    return await ctx.db.query("results").order("desc").collect();
  },
});

export const addResults = mutation({
  args: {
    year: v.string(),
    class: v.string(),
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
