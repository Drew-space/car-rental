import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JoinCommunity() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="relative h-[420px] md:h-[520px] overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury car available for rent"
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Be Part of the Horizone Community
          </h2>
          <p className="mt-4 max-w-xl text-sm md:text-base text-white/80">
            Join a community that&apos;s redefining what it means to drive. As a
            member of Horizone, you gain access to exclusive deals, priority
            bookings, and a network of drivers who share a passion for the open
            road.
          </p>

          <Link
            href="/cars"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white pl-6 pr-2 py-2 text-sm font-medium text-foreground hover:opacity-90 transition"
          >
            Explore Our Fleet
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <div className="mt-6 h-2 w-2 rounded-sm bg-white/30" />
        </div>
      </div>
    </section>
  );
}
