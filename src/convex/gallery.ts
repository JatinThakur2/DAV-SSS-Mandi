// convex/gallery.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getGalleryEvents = query({
  handler: async (ctx) => {
    return await ctx.db.query("galleryEvents").order("desc").collect();
  },
});

export const getGalleryEventById = query({
  args: { id: v.id("galleryEvents") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getGalleryImagesByEvent = query({
  args: { eventId: v.id("galleryEvents") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("galleryImages")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();
  },
});

export const addGalleryEvent = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    description: v.string(),
    thumbnail: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("galleryEvents", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateGalleryEvent = mutation({
  args: {
    id: v.id("galleryEvents"),
    title: v.string(),
    date: v.string(),
    description: v.string(),
    thumbnail: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, data);
  },
});

export const deleteGalleryEvent = mutation({
  args: { id: v.id("galleryEvents") },
  handler: async (ctx, args) => {
    // First, delete all images for this event
    const images = await ctx.db
      .query("galleryImages")
      .filter((q: any) => q.eq("eventId", args.id))
      .collect();

    for (const image of images) {
      await ctx.db.delete(image._id);
    }

    // Then delete the event
    return await ctx.db.delete(args.id);
  },
});

export const addGalleryImage = mutation({
  args: {
    eventId: v.id("galleryEvents"),
    imageUrl: v.string(),
    caption: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("galleryImages", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const deleteGalleryImage = mutation({
  args: { id: v.id("galleryImages") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
