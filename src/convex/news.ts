import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getNews = query({
  args: { isNotice: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    let newsQuery = ctx.db.query("news");

    // Only apply the filter if isNotice is defined
    if (args.isNotice !== undefined) {
      newsQuery = newsQuery.filter((q) =>
        q.eq(q.field("isNotice"), args.isNotice)
      );
    }

    // Get the results
    return await newsQuery.collect();
  },
});

export const addNews = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    description: v.string(),
    isNotice: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("news", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateNews = mutation({
  args: {
    id: v.id("news"),
    title: v.string(),
    date: v.string(),
    description: v.string(),
    isNotice: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, data);
  },
});

export const deleteNews = mutation({
  args: { id: v.id("news") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
