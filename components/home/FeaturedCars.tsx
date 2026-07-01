import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import CarCard from "../Carcard";
// import CarCard from "@/components/Carcard";

interface FeaturedCarsProps {
  cars: Doc<"cars">[];
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  if (cars.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Featured cars
        </h2>
        <Link
          href="/cars"
          className="hidden md:inline-flex items-center gap-1 text-sm font-medium hover:opacity-70"
        >
          See All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </section>
  );
}
