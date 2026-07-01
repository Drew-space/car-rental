import Link from "next/link";
import { Doc } from "@/convex/_generated/dataModel";
import CarCard from "@/components/Carcard";

interface TopPicksProps {
  cars: Doc<"cars">[];
  isLoading: boolean;
}

export default function TopPicks({ cars, isLoading }: TopPicksProps) {
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

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-surface animate-pulse h-64"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.slice(0, 8).map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}

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
