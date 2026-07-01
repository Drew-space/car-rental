import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Users,
  Settings2,
  Star,
  Fuel,
  Gauge,
  Snowflake,
  Bluetooth,
  ShieldCheck,
  MapPin,
  Check,
} from "lucide-react";
import { getCarBySlug, cars } from "@/lib/cars";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return {};
  return {
    title: `${car.name} — Horizone`,
    description: `Rent the ${car.name} from $${car.price}/day with Horizone.`,
    openGraph: {
      title: `${car.name} — Horizone`,
      description: `Rent the ${car.name} from $${car.price}/day.`,
      images: [car.img],
    },
  };
}

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

const features = [
  { icon: Snowflake, label: "Climate Control" },
  { icon: Bluetooth, label: "Bluetooth Audio" },
  { icon: ShieldCheck, label: "Full Insurance" },
  { icon: MapPin, label: "GPS Navigation" },
  { icon: Gauge, label: "Cruise Control" },
  { icon: Settings2, label: "Keyless Entry" },
];

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border p-3 text-center">
      <Icon className="h-4 w-4 mx-auto text-muted-foreground" />
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

export default async function CarDetailsPage({ params }: Props) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const related = cars.filter((c) => c.slug !== car.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            ⌘ Horizone
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:opacity-70">
              Home
            </Link>
            <a href="/#about" className="hover:opacity-70">
              About
            </a>
            <Link href="/cars" className="hover:opacity-70">
              All Cars
            </Link>
            <a href="/#contact" className="hover:opacity-70">
              Contact
            </a>
          </nav>
          <button className="rounded-full bg-foreground text-background px-5 py-2 text-sm font-semibold hover:opacity-90 transition">
            Sign Up
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Link
          href="/cars"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all cars
        </Link>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Image */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-surface aspect-[4/3] overflow-hidden relative">
              <Image
                src={car.img}
                alt={car.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  className="rounded-xl bg-surface aspect-square overflow-hidden border border-transparent hover:border-foreground transition relative"
                >
                  <Image src={car.img} alt="" fill className="object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs font-medium">
              {car.tag}
            </span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">
              {car.name}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-current text-foreground" />
              <span className="font-medium text-foreground">{car.rating}</span>
              <span>· 128 reviews</span>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold">${car.price}</span>
              <span className="text-muted-foreground">/day</span>
            </div>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              The {car.name} blends refined comfort with everyday practicality.
              Whether it&apos;s a weekend escape or a long road trip, this{" "}
              {car.tag.toLowerCase()} delivers an effortless driving experience
              with class-leading reliability.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Stat icon={Users} label="Seats" value={car.seats.toString()} />
              <Stat icon={Fuel} label="Bags" value={car.bags.toString()} />
              <Stat
                icon={Settings2}
                label="Trans."
                value={car.trans.split("/")[0]}
              />
            </div>

            <Link
              href="/cars"
              className="mt-8 inline-block w-full text-center rounded-full bg-foreground text-background py-3.5 text-sm font-semibold hover:opacity-90 transition"
            >
              Book this car
            </Link>
            <button className="mt-3 w-full rounded-full border border-border py-3.5 text-sm font-semibold hover:bg-surface transition">
              Contact host
            </button>
          </div>
        </div>

        {/* Features */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight">
            Features & amenities
          </h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 rounded-xl border border-border p-4"
              >
                <f.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Specs + Policy */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Specifications
            </h2>
            <dl className="mt-6 divide-y divide-border border-y border-border">
              {[
                ["Type", car.tag],
                ["Transmission", car.trans],
                ["Seats", `${car.seats} people`],
                ["Luggage", `${car.bags} bags`],
                ["Fuel", "Petrol"],
                ["Year", "2024"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              What&apos;s included
            </h2>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Unlimited mileage",
                "24/7 roadside assistance",
                "Free cancellation up to 48h",
                "Comprehensive insurance",
                "Second driver included",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-4 w-4" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight">
            You might also like
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/cars/${c.slug}`}
                className="group rounded-2xl bg-surface p-4 hover:shadow-lg transition"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white">
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    className="object-cover  group-hover:scale-105 transition"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.tag}</p>
                  </div>
                  <p className="font-bold">
                    ${c.price}
                    <span className="text-xs font-normal text-muted-foreground">
                      /day
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-8 text-xs text-muted-foreground text-center">
          ©2026 Horizone. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
