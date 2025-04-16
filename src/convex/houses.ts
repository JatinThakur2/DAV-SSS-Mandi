// convex/houses.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// HOUSE INFO FUNCTIONS
export const getHouseInfo = query({
  handler: async (ctx) => {
    return await ctx.db.query("houseInfo").first();
  },
});

export const updateHouseInfo = mutation({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("houseInfo").first();

    if (existing) {
      // Update existing record
      return await ctx.db.patch(existing._id, {
        ...args,
        updatedAt: Date.now(),
      });
    } else {
      // Create new record if none exists
      return await ctx.db.insert("houseInfo", {
        ...args,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// SCHOOL PRESIDIUM FUNCTIONS
export const getSchoolPresidium = query({
  args: { year: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.year) {
      return await ctx.db
        .query("schoolPresidium")
        .filter((q) => q.eq(q.field("year"), args.year))
        .collect();
    }

    // Get the latest year's data by default
    const allPresidium = await ctx.db.query("schoolPresidium").collect();

    if (allPresidium.length === 0) return [];

    // Find the most recent year
    const years = [...new Set(allPresidium.map((item) => item.year))];
    const latestYear = years.sort().reverse()[0];

    return allPresidium.filter((item) => item.year === latestYear);
  },
});

export const addPresidiumMember = mutation({
  args: {
    position: v.string(),
    name: v.string(),
    year: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("schoolPresidium", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updatePresidiumMember = mutation({
  args: {
    id: v.id("schoolPresidium"),
    position: v.string(),
    name: v.string(),
    year: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });
  },
});

export const deletePresidiumMember = mutation({
  args: { id: v.id("schoolPresidium") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// HOUSES FUNCTIONS
export const getHouses = query({
  handler: async (ctx) => {
    return await ctx.db.query("houses").collect();
  },
});

export const getHouseById = query({
  args: { id: v.id("houses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const addHouse = mutation({
  args: {
    name: v.string(),
    captainBoy: v.string(),
    captainGirl: v.string(),
    houseTeacher: v.string(),
    color: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("houses", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateHouse = mutation({
  args: {
    id: v.id("houses"),
    name: v.string(),
    captainBoy: v.string(),
    captainGirl: v.string(),
    houseTeacher: v.string(),
    color: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteHouse = mutation({
  args: { id: v.id("houses") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
