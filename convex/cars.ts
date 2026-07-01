// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// // ─── Helpers ───────────────────────────────────────────────────────────────

// function slugify(name: string) {
//   return name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-");
// }

// // async function requireAdmin(ctx: any) {
// //   const identity = await ctx.auth.getUserIdentity();
// //   if (!identity) throw new Error("Not authenticated");
// //   const role = (identity as any).publicMetadata?.role;
// //   if (role !== "admin") throw new Error("Not authorized");
// // }

// // async function requireAdmin(ctx: any) {
// //   const identity = await ctx.auth.getUserIdentity();
// //   if (!identity) throw new Error("Not authenticated");

// //   let metadata: any = {};
// //   try {
// //     metadata =
// //       typeof identity.metadata === "string"
// //         ? JSON.parse(identity.metadata)
// //         : identity.metadata;
// //   } catch {
// //     metadata = {};
// //   }

// //   if (metadata?.role !== "admin") throw new Error("Not authorized");
// // }

// // async function requireAdmin(ctx: any) {
// //   const identity = await ctx.auth.getUserIdentity();

// //   console.log("IDENTITY:", JSON.stringify(identity, null, 2));

// //   if (!identity) throw new Error("Not authenticated");

// //   let metadata: any = {};

// //   try {
// //     metadata =
// //       typeof identity.metadata === "string"
// //         ? JSON.parse(identity.metadata)
// //         : identity.metadata;
// //   } catch {
// //     metadata = {};
// //   }

// //   console.log("METADATA:", metadata);

// //   if (metadata?.role !== "admin") {
// //     throw new Error("Not authorized");
// //   }
// // }

// async function requireAdmin(ctx: any) {
//   const identity = await ctx.auth.getUserIdentity();
//   if (!identity) throw new Error("Not authenticated");

//   const user = await ctx.db
//     .query("users")
//     .withIndex("by_clerkId", (q: any) => q.eq("clerkId", identity.subject))
//     .unique();

//   if (!user || user.role !== "admin") {
//     throw new Error("Not authorized");
//   }

//   return user;
// }
// // ─── Queries ───────────────────────────────────────────────────────────────

// // Public — only published cars
// export const getAllCars = query({
//   args: {},
//   handler: async (ctx) => {
//     const cars = await ctx.db
//       .query("cars")
//       .withIndex("by_published", (q) => q.eq("isPublished", true))
//       .collect();

//     return Promise.all(
//       cars.map(async (car) => ({
//         ...car,
//         coverImageUrl: car.coverImageId
//           ? await ctx.storage.getUrl(car.coverImageId)
//           : null,
//         imageUrls: car.imageIds
//           ? await Promise.all(car.imageIds.map((id) => ctx.storage.getUrl(id)))
//           : [],
//       })),
//     );
//   },
// });

// // Public — featured cars for homepage
// export const getFeaturedCars = query({
//   args: {},
//   handler: async (ctx) => {
//     const cars = await ctx.db
//       .query("cars")
//       .withIndex("by_featured", (q) => q.eq("isFeatured", true))
//       .collect();

//     // Only return published featured cars
//     const published = cars.filter((c) => c.isPublished);

//     return Promise.all(
//       published.map(async (car) => ({
//         ...car,
//         coverImageUrl: car.coverImageId
//           ? await ctx.storage.getUrl(car.coverImageId)
//           : null,
//         imageUrls: car.imageIds
//           ? await Promise.all(car.imageIds.map((id) => ctx.storage.getUrl(id)))
//           : [],
//       })),
//     );
//   },
// });

// // Public — single car by slug
// export const getCarBySlug = query({
//   args: { slug: v.string() },
//   handler: async (ctx, { slug }) => {
//     const car = await ctx.db
//       .query("cars")
//       .withIndex("by_slug", (q) => q.eq("slug", slug))
//       .unique();

//     if (!car) return null;

//     return {
//       ...car,
//       coverImageUrl: car.coverImageId
//         ? await ctx.storage.getUrl(car.coverImageId)
//         : null,
//       imageUrls: car.imageIds
//         ? await Promise.all(car.imageIds.map((id) => ctx.storage.getUrl(id)))
//         : [],
//     };
//   },
// });

// // Admin — all cars including unpublished
// export const getAllCarsAdmin = query({
//   args: {},
//   handler: async (ctx) => {
//     await requireAdmin(ctx);
//     const cars = await ctx.db.query("cars").collect();

//     return Promise.all(
//       cars.map(async (car) => ({
//         ...car,
//         coverImageUrl: car.coverImageId
//           ? await ctx.storage.getUrl(car.coverImageId)
//           : null,
//         imageUrls: car.imageIds
//           ? await Promise.all(car.imageIds.map((id) => ctx.storage.getUrl(id)))
//           : [],
//       })),
//     );
//   },
// });

// // Admin — single car by ID for edit page
// export const getCarById = query({
//   args: { id: v.id("cars") },
//   handler: async (ctx, { id }) => {
//     await requireAdmin(ctx);
//     const car = await ctx.db.get(id);
//     if (!car) return null;

//     return {
//       ...car,
//       coverImageUrl: car.coverImageId
//         ? await ctx.storage.getUrl(car.coverImageId)
//         : null,
//       imageUrls: car.imageIds
//         ? await Promise.all(car.imageIds.map((id) => ctx.storage.getUrl(id)))
//         : [],
//     };
//   },
// });

// // ─── Image Upload ───────────────────────────────────────────────────────────

// export const generateUploadUrl = mutation({
//   args: {},
//   handler: async (ctx) => {
//     await requireAdmin(ctx);
//     return await ctx.storage.generateUploadUrl();
//   },
// });

// // ─── Mutations ─────────────────────────────────────────────────────────────

// // Add a new car (admin only)
// export const addCar = mutation({
//   args: {
//     name: v.string(),
//     tag: v.string(),
//     trans: v.string(),
//     seats: v.number(),
//     bags: v.number(),
//     rating: v.number(),
//     price: v.number(),
//     coverImageId: v.optional(v.id("_storage")),
//     imageIds: v.optional(v.array(v.id("_storage"))),
//     description: v.optional(v.string()),
//     whatsapp: v.optional(v.string()),
//     phone: v.optional(v.string()),
//     isPublished: v.boolean(),
//     isFeatured: v.boolean(),
//     postedBy: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     await requireAdmin(ctx);

//     const slug = slugify(args.name);

//     const existing = await ctx.db
//       .query("cars")
//       .withIndex("by_slug", (q) => q.eq("slug", slug))
//       .unique();

//     if (existing)
//       throw new Error(`A car with the slug "${slug}" already exists.`);

//     return await ctx.db.insert("cars", { ...args, slug });
//   },
// });

// // Edit an existing car (admin only)
// export const editCar = mutation({
//   args: {
//     id: v.id("cars"),
//     name: v.optional(v.string()),
//     tag: v.optional(v.string()),
//     trans: v.optional(v.string()),
//     seats: v.optional(v.number()),
//     bags: v.optional(v.number()),
//     rating: v.optional(v.number()),
//     price: v.optional(v.number()),
//     coverImageId: v.optional(v.id("_storage")),
//     imageIds: v.optional(v.array(v.id("_storage"))),
//     description: v.optional(v.string()),
//     whatsapp: v.optional(v.string()),
//     phone: v.optional(v.string()),
//     isPublished: v.optional(v.boolean()),
//     isFeatured: v.optional(v.boolean()),
//   },
//   handler: async (ctx, { id, ...fields }) => {
//     await requireAdmin(ctx);

//     const car = await ctx.db.get(id);
//     if (!car) throw new Error("Car not found");

//     const updates: any = { ...fields };
//     if (fields.name) updates.slug = slugify(fields.name);

//     await ctx.db.patch(id, updates);
//   },
// });

// // Toggle isPublished (admin only)
// export const togglePublished = mutation({
//   args: { id: v.id("cars") },
//   handler: async (ctx, { id }) => {
//     await requireAdmin(ctx);
//     const car = await ctx.db.get(id);
//     if (!car) throw new Error("Car not found");
//     await ctx.db.patch(id, { isPublished: !car.isPublished });
//   },
// });

// // Toggle isFeatured (admin only)
// export const toggleFeatured = mutation({
//   args: { id: v.id("cars") },
//   handler: async (ctx, { id }) => {
//     await requireAdmin(ctx);
//     const car = await ctx.db.get(id);
//     if (!car) throw new Error("Car not found");
//     await ctx.db.patch(id, { isFeatured: !car.isFeatured });
//   },
// });

// // Delete a car and its images from storage (admin only)
// export const deleteCar = mutation({
//   args: { id: v.id("cars") },
//   handler: async (ctx, { id }) => {
//     await requireAdmin(ctx);
//     const car = await ctx.db.get(id);
//     if (!car) throw new Error("Car not found");

//     if (car.coverImageId) await ctx.storage.delete(car.coverImageId);
//     if (car.imageIds) {
//       await Promise.all(car.imageIds.map((imgId) => ctx.storage.delete(imgId)));
//     }

//     await ctx.db.delete(id);
//   },
// });

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

// ─── Queries ───────────────────────────────────────────────────────────────

export const getAllCars = query({
  args: {},
  handler: async (ctx) => {
    const cars = await ctx.db
      .query("cars")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();

    return Promise.all(
      cars.map(async (car) => ({
        ...car,
        coverImageUrl: car.coverImageId
          ? await ctx.storage.getUrl(car.coverImageId)
          : null,
        imageUrls: car.imageIds
          ? await Promise.all(car.imageIds.map((id) => ctx.storage.getUrl(id)))
          : [],
      })),
    );
  },
});

export const getFeaturedCars = query({
  args: {},
  handler: async (ctx) => {
    const cars = await ctx.db
      .query("cars")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .collect();

    const published = cars.filter((c) => c.isPublished);

    return Promise.all(
      published.map(async (car) => ({
        ...car,
        coverImageUrl: car.coverImageId
          ? await ctx.storage.getUrl(car.coverImageId)
          : null,
        imageUrls: car.imageIds
          ? await Promise.all(car.imageIds.map((id) => ctx.storage.getUrl(id)))
          : [],
      })),
    );
  },
});

export const getCarBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const car = await ctx.db
      .query("cars")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (!car) return null;

    return {
      ...car,
      coverImageUrl: car.coverImageId
        ? await ctx.storage.getUrl(car.coverImageId)
        : null,
      imageUrls: car.imageIds
        ? await Promise.all(car.imageIds.map((id) => ctx.storage.getUrl(id)))
        : [],
    };
  },
});

export const getAllCarsAdmin = query({
  args: {},
  handler: async (ctx) => {
    const cars = await ctx.db.query("cars").collect();

    return Promise.all(
      cars.map(async (car) => ({
        ...car,
        coverImageUrl: car.coverImageId
          ? await ctx.storage.getUrl(car.coverImageId)
          : null,
        imageUrls: car.imageIds
          ? await Promise.all(car.imageIds.map((id) => ctx.storage.getUrl(id)))
          : [],
      })),
    );
  },
});

export const getCarById = query({
  args: { id: v.id("cars") },
  handler: async (ctx, { id }) => {
    const car = await ctx.db.get(id);
    if (!car) return null;

    return {
      ...car,
      coverImageUrl: car.coverImageId
        ? await ctx.storage.getUrl(car.coverImageId)
        : null,
      imageUrls: car.imageIds
        ? await Promise.all(car.imageIds.map((id) => ctx.storage.getUrl(id)))
        : [],
    };
  },
});

// ─── Image Upload ────────────────────────────────────────────────────────

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// ─── Mutations ─────────────────────────────────────────────────────────────

export const addCar = mutation({
  args: {
    name: v.string(),
    tag: v.string(),
    trans: v.string(),
    seats: v.number(),
    bags: v.number(),
    rating: v.number(),
    price: v.number(),
    coverImageId: v.optional(v.id("_storage")),
    imageIds: v.optional(v.array(v.id("_storage"))),
    description: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
    phone: v.optional(v.string()),
    isPublished: v.boolean(),
    isFeatured: v.boolean(),
    postedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const slug = slugify(args.name);

    const existing = await ctx.db
      .query("cars")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (existing)
      throw new Error(`A car with the slug "${slug}" already exists.`);

    return await ctx.db.insert("cars", { ...args, slug });
  },
});

export const editCar = mutation({
  args: {
    id: v.id("cars"),
    name: v.optional(v.string()),
    tag: v.optional(v.string()),
    trans: v.optional(v.string()),
    seats: v.optional(v.number()),
    bags: v.optional(v.number()),
    rating: v.optional(v.number()),
    price: v.optional(v.number()),
    coverImageId: v.optional(v.id("_storage")),
    imageIds: v.optional(v.array(v.id("_storage"))),
    description: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
    phone: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...fields }) => {
    const car = await ctx.db.get(id);
    if (!car) throw new Error("Car not found");

    const updates: any = { ...fields };
    if (fields.name) updates.slug = slugify(fields.name);

    await ctx.db.patch(id, updates);
  },
});

export const togglePublished = mutation({
  args: { id: v.id("cars") },
  handler: async (ctx, { id }) => {
    const car = await ctx.db.get(id);
    if (!car) throw new Error("Car not found");
    await ctx.db.patch(id, { isPublished: !car.isPublished });
  },
});

export const toggleFeatured = mutation({
  args: { id: v.id("cars") },
  handler: async (ctx, { id }) => {
    const car = await ctx.db.get(id);
    if (!car) throw new Error("Car not found");
    await ctx.db.patch(id, { isFeatured: !car.isFeatured });
  },
});

export const deleteCar = mutation({
  args: { id: v.id("cars") },
  handler: async (ctx, { id }) => {
    const car = await ctx.db.get(id);
    if (!car) throw new Error("Car not found");

    if (car.coverImageId) await ctx.storage.delete(car.coverImageId);
    if (car.imageIds) {
      await Promise.all(car.imageIds.map((imgId) => ctx.storage.delete(imgId)));
    }

    await ctx.db.delete(id);
  },
});
