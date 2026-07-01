import Link from "next/link";
import Image from "next/image";
import { Users, Settings2, Star, Fuel } from "lucide-react";
import { cars } from "@/lib/cars";

export default function MockTopPicks() {
  const topPicks = cars.slice(0, 8);

  return (
    <section id="cars" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Top picks vehicle this month
        </h2>
        <p className="mt-2 text-muted-foreground">
          Experience the epitome of amazing journey with our top picks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topPicks.map((c) => (
          <Link
            key={c.slug}
            href={`/cars/${c.slug}`}
            className="group rounded-2xl p-4"
          >
            <div className="relative bg-[#f6f6f6] aspect-[4/3] overflow-hidden rounded-xl bg-white">
              <span className="absolute top-3 left-3 z-10 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium">
                {c.tag}
              </span>
              <Image
                src={c.img}
                alt={c.name}
                fill
                className="object-contain group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Settings2 className="h-3.5 w-3.5" />
                <span>{c.trans}</span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {c.seats}
                </span>
                <span className="flex items-center gap-1">
                  <Fuel className="h-3.5 w-3.5" />
                  {c.bags}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {c.rating}
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-[11px] text-muted-foreground">
                    Start from
                  </p>
                  <p className="text-lg font-bold">
                    ${c.price}
                    <span className="text-xs font-normal text-muted-foreground">
                      /day
                    </span>
                  </p>
                </div>
                <span className="rounded-full border border-border px-3 py-1.5 text-xs font-medium group-hover:bg-foreground group-hover:text-background transition">
                  Rent
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/cars"
          className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-foreground hover:text-background transition"
        >
          See More
        </Link>
      </div>
    </section>
  );
}
