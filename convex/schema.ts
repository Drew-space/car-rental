import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    username: v.string(),
    imageUrl: v.string(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  cars: defineTable({
    name: v.string(),
    slug: v.string(),
    tag: v.string(),
    trans: v.string(),
    seats: v.number(),
    bags: v.number(),
    rating: v.number(),
    price: v.number(),

    coverImageId: v.optional(v.id("_storage")),
    imageIds: v.optional(v.array(v.id("_storage"))),

    whatsapp: v.optional(v.string()),
    phone: v.optional(v.string()),

    description: v.optional(v.string()),

    isPublished: v.boolean(),
    isFeatured: v.boolean(),

    postedBy: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_tag", ["tag"])
    .index("by_published", ["isPublished"])
    .index("by_featured", ["isFeatured"])
    .searchIndex("search_cars", {
      searchField: "name",
      filterFields: ["tag", "isPublished"],
    }),
});
