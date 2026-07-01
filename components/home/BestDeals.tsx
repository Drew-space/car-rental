import Image from "next/image";

const DEALS = [
  {
    img: "/cars/deal-festive.jpg",
    badge: "Valid only on 12 Jan - 19 Jan 2024",
    title: "Experience the Holidays with Our Festive Promotions",
    pct: "40%",
  },
  {
    img: "/cars/deal-online.jpg",
    badge: "Valid only on 8 Jan - 22 Jan 2024",
    title: "Unlock Online-Only Discounts for a Seamless Booking Experience",
    pct: "65%",
  },
] as const;

export default function BestDeals() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Enjoy extra miles with our best deal
        </h2>
        <a
          href="#"
          className="hidden md:inline-flex items-center gap-1 text-sm font-medium hover:opacity-70"
        >
          See All
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEALS.map((d) => (
          <div
            key={d.title}
            className="relative h-72 overflow-hidden rounded-2xl"
          >
            <Image src={d.img} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs">
                <span className="h-2 w-2 rounded-full bg-yellow-400" />{" "}
                {d.badge}
              </span>
              <div>
                <p className="text-5xl font-bold">{d.pct}</p>
                <p className="mt-2 text-sm max-w-xs">{d.title}</p>
                <p className="mt-1 text-[10px] text-white/60">
                  *with Terms and Condition
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
