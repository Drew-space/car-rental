"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import TopPicks from "@/components/home/TopPicks";
import FeaturedCars from "@/components/home/FeaturedCars";
import BestDeals from "@/components/home/BestDeals";
import CtaGrid from "@/components/home/CtaGrid";
import SiteFooter from "@/components/home/SiteFooter";
import JoinCommunity from "@/components/home/JoinCommunity";
import MockTopPicks from "@/components/home/MockTopPicks";
import { HeroDark } from "@/components/HeroDark";

export default function HomePage() {
  const allCarsResult = useQuery(api.cars.getAllCars);
  const featuredCars = useQuery(api.cars.getFeaturedCars) ?? [];

  const allCars = allCarsResult ?? [];
  const isLoading = allCarsResult === undefined;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroDark />
      <MockTopPicks />
      {/* <TopPicks cars={allCars} isLoading={isLoading} /> */}
      <FeaturedCars cars={featuredCars} />
      <JoinCommunity />
      <CtaGrid vehicleCount={allCars.length} />
      <SiteFooter />
    </div>
  );
}
