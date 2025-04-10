// convex/notices.js
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Get all notices
export const getAll = query({
  async handler(ctx) {
    return await ctx.db.query("notices").order("desc").collect();
  },
});

// Get published notices
export const getPublished = query({
  async handler(ctx) {
    const now = Date.now();
    return await ctx.db
      .query("notices")
      .filter((q) =>
        q
          .eq(q.field("isPublished"), true)
          // Only return notices that aren't expired or don't have an expiry date
          .and(
            q.or(
              q.eq(q.field("expiryDate"), undefined),
              q.gt(q.field("expiryDate"), now)
            )
          )
      )
      .order("desc")
      .collect();
  },
});

// Get notice by ID
export const getById = query({
  args: { id: v.id("notices") },
  async handler(ctx, args) {
    const notice = await ctx.db.get(args.id);
    if (!notice) {
      throw new ConvexError("Notice not found");
    }
    return notice;
  },
});

// Create a new notice
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    publishedBy: v.string(),
    isImportant: v.optional(v.boolean()),
    isPublished: v.optional(v.boolean()),
    expiryDate: v.optional(v.number()),
  },
  async handler(ctx, args) {
    const {
      title,
      content,
      publishedBy,
      isImportant = false,
      isPublished = false,
      expiryDate,
    } = args;

    const noticeId = await ctx.db.insert("notices", {
      title,
      content,
      date: Date.now(),
      publishedBy,
      isImportant,
      isPublished,
      expiryDate,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { noticeId };
  },
});

// Update a notice
export const update = mutation({
  args: {
    id: v.id("notices"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    isImportant: v.optional(v.boolean()),
    isPublished: v.optional(v.boolean()),
    expiryDate: v.optional(v.number()),
  },
  async handler(ctx, args) {
    const { id, title, content, isImportant, isPublished, expiryDate } = args;

    // Check if notice exists
    const existingNotice = await ctx.db.get(id);
    if (!existingNotice) {
      throw new ConvexError("Notice not found");
    }

    // Update only the provided fields
    const updates = {
      updatedAt: Date.now(),
    };

    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;
    if (isImportant !== undefined) updates.isImportant = isImportant;
    if (isPublished !== undefined) updates.isPublished = isPublished;
    if (expiryDate !== undefined) updates.expiryDate = expiryDate;

    await ctx.db.patch(id, updates);

    return { success: true };
  },
});

// Delete a notice
export const remove = mutation({
  args: { id: v.id("notices") },
  async handler(ctx, args) {
    // Check if notice exists
    const existingNotice = await ctx.db.get(args.id);
    if (!existingNotice) {
      throw new ConvexError("Notice not found");
    }

    await ctx.db.delete(args.id);

    return { success: true };
  },
});
