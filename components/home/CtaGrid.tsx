import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings2 } from "lucide-react";

interface CtaGridProps {
  vehicleCount: number;
}

export default function CtaGrid({ vehicleCount }: CtaGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid grid-rows-2 gap-6">
          <div className="relative overflow-hidden rounded-2xl bg-surface-dark p-8 text-white min-h-[220px]">
            <Image
              src="/cars/cta-comfort.jpg"
              alt=""
              fill
              className="object-cover opacity-40"
            />
            <div className="relative z-10">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Settings2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">
                Explore more to get your comfort zone
              </h3>
              <p className="mt-1 text-sm text-white/70">
                Book your perfect stay with us.
              </p>
              <Link
                href="/cars"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white text-foreground px-4 py-2 text-sm font-medium"
              >
                Booking Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl min-h-[180px]">
            <Image
              src="/cars/cta-speedo.jpg"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-8 text-white">
              <p className="text-sm text-white/70">Vehicle Available</p>
              <p className="text-4xl font-bold">{vehicleCount || "—"}</p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl min-h-[460px]">
          <Image
            src="https://www.catalana-auto.com/wp-content/uploads/2023/09/two-audis-standing.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex items-center justify-center p-8">
            <h3 className="text-3xl md:text-4xl font-semibold text-white text-center max-w-md">
              Beyond accommodation, creating memories of a lifetime
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
