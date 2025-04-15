import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Generate a signed URL for file upload
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Store the file information after upload
export const saveFileInfo = mutation({
  args: {
    storageId: v.string(),
    fileName: v.string(),
    fileType: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the URL for the uploaded file
    const url = await ctx.storage.getUrl(args.storageId);

    if (url === null) {
      throw new Error("Failed to get URL for uploaded file");
    }

    return { url, storageId: args.storageId };
  },
});
