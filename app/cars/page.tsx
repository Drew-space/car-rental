"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  Users,
  Settings2,
  Star,
  Fuel,
  Search,
  SlidersHorizontal,
  Menu,
} from "lucide-react";
import { cars } from "@/lib/cars";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

const CAR_TAGS = ["All", "SUV", "Sedan", "Hatchback", "Minivan", "MPV"];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "All Cars", href: "/cars" },
  { label: "Contact", href: "/#contact" },
] as const;

export default function AllCarsPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200);

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(query.toLowerCase());
      const matchesTag = activeTag === "All" || c.tag === activeTag;
      const matchesPrice = c.price <= maxPrice;
      return matchesSearch && matchesTag && matchesPrice;
    });
  }, [query, activeTag, maxPrice]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            ⌘ Horizone
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <button className="hidden md:inline-flex rounded-full bg-foreground text-background px-5 py-2 text-sm font-semibold hover:opacity-90 transition">
            Sign Up
          </button>

          {/* Mobile nav trigger */}
          <div className="md:hidden">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>⌘ Horizone</DrawerTitle>
                </DrawerHeader>

                <nav className="flex flex-col gap-1 px-4">
                  {NAV_LINKS.map((link) => (
                    <DrawerClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="rounded-lg px-3 py-3 text-base font-medium hover:bg-surface transition"
                      >
                        {link.label}
                      </Link>
                    </DrawerClose>
                  ))}
                </nav>

                <DrawerFooter>
                  <Button className="w-full rounded-full">Sign Up</Button>
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="relative h-56 md:h-72 w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1575650681837-c0ca3b1e7275?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3xfSlBkY0JubDluOHx8ZW58MHx8fHx8"
          alt="Cars banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Find Your Perfect Ride
          </h1>
          <p className="mt-3 text-white/75 text-sm md:text-base max-w-md">
            Browse our full fleet and book the car that fits your journey.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by car name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-border bg-surface pl-11 pr-4 py-2.5 text-sm outline-none focus:border-foreground transition"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {CAR_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium border transition ${
                  activeTag === tag
                    ? "bg-foreground text-background border-foreground"
                    : "border-border hover:bg-surface"
                }`}
              >
                {tag}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Max ${maxPrice}/day</span>
              <input
                type="range"
                min={40}
                max={200}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-28 accent-foreground"
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "car" : "cars"} found
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((c) => (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-2xl font-bold">No cars found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveTag("All");
                setMaxPrice(200);
              }}
              className="mt-4 rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-surface transition"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16">
        <div className="mx-auto max-w-7xl px-6 py-8 text-xs text-muted-foreground text-center">
          ©2026 Horizone. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
