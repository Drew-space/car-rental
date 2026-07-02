import Link from "next/link";

const RENTAL_OCCASIONS = [
  { label: "Rent a Car for Weddings", query: "wedding" },
  { label: "Rent a Car for Owambe", query: "owambe" },
  { label: "Airport Pickup & Drop-off", query: "airport" },
  { label: "Rent a Car for Traveling", query: "travel" },
  { label: "Corporate & Official Hire", query: "corporate" },
  { label: "Rent a Car for Burial Ceremonies", query: "burial" },
  { label: "Self-Drive Rentals", query: "self-drive" },
  { label: "Rent a Car with Driver", query: "with-driver" },
  { label: "Rent a Car for Church Programs", query: "church" },
  { label: "Rent a Car for Birthdays", query: "birthday" },
  { label: "Inter-State Travel", query: "interstate" },
  { label: "Rent a Car for Photoshoots", query: "photoshoot" },
] as const;

export default function PopularRentals() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Discover the perfect ride for every occasion
        </h2>
        <p className="mt-2 text-muted-foreground">
          From owambe to office runs — explore rentals built for how Nigerians
          move.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {RENTAL_OCCASIONS.map((occasion) => (
          <Link
            key={occasion.query}
            href={`/cars?occasion=${occasion.query}`}
            className="rounded-md border border-border bg-[#f6f6f6] px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-foreground hover:text-background hover:border-foreground transition"
          >
            {occasion.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
