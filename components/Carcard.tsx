"use client";

import Link from "next/link";
import Image from "next/image";
import { Settings2, Users, ShoppingBag, Star } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";

type CarCardProps = {
  car: Doc<"cars"> & { coverImageUrl?: string | null };
  adminMode?: boolean;
};

export default function CarCard({ car, adminMode = false }: CarCardProps) {
  const inner = (
    <div className="group rounded-2xl bg-surface p-4 hover:shadow-lg transition">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
        {/* Tag badge */}
        <span className="absolute top-3 left-3 z-10 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium">
          {car.tag}
        </span>

        {car.coverImageUrl ? (
          <Image
            src={car.coverImageUrl}
            alt={car.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* Body */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg leading-tight">{car.name}</h3>

        {/* Trans */}
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Settings2 className="h-3.5 w-3.5" />
          <span>{car.trans}</span>
        </div>

        {/* Specs row */}
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {car.seats}
          </span>
          <span className="flex items-center gap-1">
            <ShoppingBag className="h-3.5 w-3.5" /> {car.bags}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current" /> {car.rating}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] text-muted-foreground">Start from</p>
            <p className="text-lg font-bold">
              ${car.price}
              <span className="text-xs font-normal text-muted-foreground">
                /day
              </span>
            </p>
          </div>
          <span className="rounded-full border border-border px-3 py-1.5 text-xs font-medium group-hover:bg-foreground group-hover:text-background transition">
            Rent
          </span>
        </div>

        {/* Admin-only badges */}
        {adminMode && (
          <div className="mt-3 flex gap-2">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border border-border ${
                car.isPublished ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {car.isPublished ? "Live" : "Draft"}
            </span>
            {car.isFeatured && (
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-foreground">
                Featured
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (adminMode) return inner;

  return (
    <Link href={`/cars/${car.slug}`} className="block">
      {inner}
    </Link>
  );
}
