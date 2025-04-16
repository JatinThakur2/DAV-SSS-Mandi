// src/convex/staff.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// TEACHING STAFF FUNCTIONS

export const getTeachingStaff = query({
  args: { designation: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let staffQuery = ctx.db.query("teachingStaff");

    // Filter by designation if provided
    if (args.designation) {
      staffQuery = staffQuery.filter((q) =>
        q.eq(q.field("designation"), args.designation)
      );
    }

    // Get and sort the results by order if available, otherwise sort by name
    const staff = await staffQuery.collect();

    return staff.sort((a, b) => {
      // First sort by order if available
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }

      // Then by designation precedence (Principal first, etc.)
      const designationPriority = (designation) => {
        if (designation.includes("Principal")) return 0;
        if (designation.includes("Vice Principal")) return 1;
        if (designation.includes("PGT")) return 2;
        if (designation.includes("TGT")) return 3;
        return 4;
      };

      const aPriority = designationPriority(a.designation);
      const bPriority = designationPriority(b.designation);

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      // Finally by name
      return a.name.localeCompare(b.name);
    });
  },
});

export const addTeachingStaff = mutation({
  args: {
    name: v.string(),
    designation: v.string(),
    qualification: v.string(),
    experience: v.string(),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("teachingStaff", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateTeachingStaff = mutation({
  args: {
    id: v.id("teachingStaff"),
    name: v.string(),
    designation: v.string(),
    qualification: v.string(),
    experience: v.string(),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteTeachingStaff = mutation({
  args: { id: v.id("teachingStaff") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// NON-TEACHING STAFF FUNCTIONS

export const getNonTeachingStaff = query({
  args: { staffType: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let staffQuery = ctx.db.query("nonTeachingStaff");

    // Filter by staff type if provided
    if (args.staffType) {
      staffQuery = staffQuery.filter((q) =>
        q.eq(q.field("staffType"), args.staffType)
      );
    }

    // Get and sort the results
    const staff = await staffQuery.collect();

    return staff.sort((a, b) => {
      // First sort by staff type (ministerial first)
      if (a.staffType !== b.staffType) {
        return a.staffType === "ministerial" ? -1 : 1;
      }

      // Then by order if available
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }

      // Then by designation precedence
      const designationPriority = (designation) => {
        if (designation.includes("Incharge")) return 0;
        if (designation.includes("Assistant")) return 1;
        return 2;
      };

      const aPriority = designationPriority(a.designation);
      const bPriority = designationPriority(b.designation);

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      // Finally by name
      return a.name.localeCompare(b.name);
    });
  },
});

export const addNonTeachingStaff = mutation({
  args: {
    name: v.string(),
    designation: v.string(),
    qualification: v.string(),
    experience: v.string(),
    staffType: v.string(), // "ministerial" or "supporting"
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("nonTeachingStaff", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateNonTeachingStaff = mutation({
  args: {
    id: v.id("nonTeachingStaff"),
    name: v.string(),
    designation: v.string(),
    qualification: v.string(),
    experience: v.string(),
    staffType: v.string(),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteNonTeachingStaff = mutation({
  args: { id: v.id("nonTeachingStaff") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
