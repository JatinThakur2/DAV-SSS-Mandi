// convex/news.js
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Get all news articles
export const getAll = query({
  async handler(ctx) {
    return await ctx.db.query("news").order("desc").collect();
  },
});

// Get published news articles
export const getPublished = query({
  async handler(ctx) {
    return await ctx.db
      .query("news")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .collect();
  },
});

// Get news by ID
export const getById = query({
  args: { id: v.id("news") },
  async handler(ctx, args) {
    const news = await ctx.db.get(args.id);
    if (!news) {
      throw new ConvexError("News article not found");
    }
    return news;
  },
});

// Create a new news article
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    publishedBy: v.string(),
    isPublished: v.optional(v.boolean()),
  },
  async handler(ctx, args) {
    const { title, content, publishedBy, isPublished = false } = args;

    const newsId = await ctx.db.insert("news", {
      title,
      content,
      date: Date.now(),
      publishedBy,
      isPublished,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { newsId };
  },
});

// Update a news article
export const update = mutation({
  args: {
    id: v.id("news"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  async handler(ctx, args) {
    const { id, title, content, isPublished } = args;

    // Check if news exists
    const existingNews = await ctx.db.get(id);
    if (!existingNews) {
      throw new ConvexError("News article not found");
    }

    // Update only the provided fields
    const updates = {
      updatedAt: Date.now(),
    };

    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;
    if (isPublished !== undefined) updates.isPublished = isPublished;

    await ctx.db.patch(id, updates);

    return { success: true };
  },
});

// Delete a news article
export const remove = mutation({
  args: { id: v.id("news") },
  async handler(ctx, args) {
    // Check if news exists
    const existingNews = await ctx.db.get(args.id);
    if (!existingNews) {
      throw new ConvexError("News article not found");
    }

    await ctx.db.delete(args.id);

    return { success: true };
  },
});
