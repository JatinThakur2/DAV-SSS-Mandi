// convex/gallery.js
import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { StorageReader, StorageWriter } from "./_generated/server";

// Get all gallery events
export const getAllEvents = query({
  async handler(ctx) {
    return await ctx.db.query("galleryEvents").order("desc").collect();
  },
});

// Get published gallery events
export const getPublishedEvents = query({
  async handler(ctx) {
    return await ctx.db
      .query("galleryEvents")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .collect();
  },
});

// Get gallery event by ID
export const getEventById = query({
  args: { id: v.id("galleryEvents") },
  async handler(ctx, args) {
    const event = await ctx.db.get(args.id);
    if (!event) {
      throw new ConvexError("Gallery event not found");
    }
    return event;
  },
});

// Get images for a specific event
export const getEventImages = query({
  args: { eventId: v.id("galleryEvents") },
  async handler(ctx, args) {
    return await ctx.db
      .query("galleryImages")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .order("asc")
      .collect();
  },
});

// Create a new gallery event
export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    academicYear: v.string(),
    publishedBy: v.string(),
    isPublished: v.optional(v.boolean()),
    eventDate: v.optional(v.number()),
  },
  async handler(ctx, args) {
    const {
      title,
      description,
      academicYear,
      publishedBy,
      isPublished = false,
      eventDate,
    } = args;

    const eventId = await ctx.db.insert("galleryEvents", {
      title,
      description,
      date: eventDate || Date.now(),
      academicYear,
      publishedBy,
      isPublished,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { eventId };
  },
});

// Update a gallery event
export const updateEvent = mutation({
  args: {
    id: v.id("galleryEvents"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    academicYear: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    eventDate: v.optional(v.number()),
    coverImageUrl: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const {
      id,
      title,
      description,
      academicYear,
      isPublished,
      eventDate,
      coverImageUrl,
    } = args;

    // Check if event exists
    const existingEvent = await ctx.db.get(id);
    if (!existingEvent) {
      throw new ConvexError("Gallery event not found");
    }

    // Update only the provided fields
    const updates = {
      updatedAt: Date.now(),
    };

    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (academicYear !== undefined) updates.academicYear = academicYear;
    if (isPublished !== undefined) updates.isPublished = isPublished;
    if (eventDate !== undefined) updates.date = eventDate;
    if (coverImageUrl !== undefined) updates.coverImageUrl = coverImageUrl;

    await ctx.db.patch(id, updates);

    return { success: true };
  },
});

// Delete a gallery event
export const deleteEvent = mutation({
  args: { id: v.id("galleryEvents") },
  async handler(ctx, args) {
    // Check if event exists
    const existingEvent = await ctx.db.get(args.id);
    if (!existingEvent) {
      throw new ConvexError("Gallery event not found");
    }

    // Get all images for this event
    const images = await ctx.db
      .query("galleryImages")
      .withIndex("by_event", (q) => q.eq("eventId", args.id))
      .collect();

    // Delete all images for this event
    for (const image of images) {
      await ctx.db.delete(image._id);
      // Note: In a real implementation, you would also delete the files from storage
    }

    // Delete the event
    await ctx.db.delete(args.id);

    return { success: true };
  },
});

// Generate an upload URL
export const generateUploadUrl = action({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Save image to gallery
export const saveImage = mutation({
  args: {
    eventId: v.id("galleryEvents"),
    storageId: v.string(),
    caption: v.optional(v.string()),
    uploadedBy: v.string(),
    order: v.optional(v.number()),
  },
  async handler(ctx, args) {
    const { eventId, storageId, caption, uploadedBy, order = 0 } = args;

    // Check if event exists
    const event = await ctx.db.get(eventId);
    if (!event) {
      throw new ConvexError("Gallery event not found");
    }

    // Create URL from storage ID
    const url = await ctx.storage.getUrl(storageId);
    if (!url) {
      throw new ConvexError("Failed to generate URL for uploaded file");
    }

    // Save image to database
    const imageId = await ctx.db.insert("galleryImages", {
      eventId,
      imageUrl: url,
      storageId,
      caption: caption || "",
      order,
      uploadedBy,
      createdAt: Date.now(),
    });

    // If this is the first image and no cover image is set, set it as the cover
    if (!event.coverImageUrl) {
      await ctx.db.patch(eventId, { coverImageUrl: url });
    }

    return { imageId, url };
  },
});

// Update image details
export const updateImage = mutation({
  args: {
    id: v.id("galleryImages"),
    caption: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  async handler(ctx, args) {
    const { id, caption, order } = args;

    // Check if image exists
    const image = await ctx.db.get(id);
    if (!image) {
      throw new ConvexError("Image not found");
    }

    // Update fields
    const updates = {};
    if (caption !== undefined) updates.caption = caption;
    if (order !== undefined) updates.order = order;

    await ctx.db.patch(id, updates);

    return { success: true };
  },
});

// Delete an image
export const deleteImage = mutation({
  args: { id: v.id("galleryImages") },
  async handler(ctx, args) {
    // Check if image exists
    const image = await ctx.db.get(args.id);
    if (!image) {
      throw new ConvexError("Image not found");
    }

    // Delete image from database
    await ctx.db.delete(args.id);

    // Note: In a real implementation, you would also delete the file from storage
    // await ctx.storage.delete(image.storageId);

    return { success: true };
  },
});

// Set image as cover
export const setAsCover = mutation({
  args: {
    imageId: v.id("galleryImages"),
    eventId: v.id("galleryEvents"),
  },
  async handler(ctx, args) {
    const { imageId, eventId } = args;

    // Check if image exists
    const image = await ctx.db.get(imageId);
    if (!image) {
      throw new ConvexError("Image not found");
    }

    // Ensure image belongs to this event
    if (image.eventId !== eventId) {
      throw new ConvexError("Image does not belong to this event");
    }

    // Update event cover image
    await ctx.db.patch(eventId, { coverImageUrl: image.imageUrl });

    return { success: true };
  },
});
