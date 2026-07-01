"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EllipsisVertical, Search, Plus } from "lucide-react";
import Link from "next/link";
import CarCard from "@/components/Carcard";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const allCars = useQuery(api.cars.getAllCarsAdmin) ?? [];
  const featuredCars = useQuery(api.cars.getFeaturedCars) ?? [];

  const deleteCar = useMutation(api.cars.deleteCar);
  const togglePublished = useMutation(api.cars.togglePublished);
  const toggleFeatured = useMutation(api.cars.toggleFeatured);

  // ── Stats ─────────────────────────────────────────────────────────
  const totalCars = allCars.length;
  const totalPublished = allCars.filter((c) => c.isPublished).length;
  const totalFeatured = featuredCars.length;
  const totalDraft = allCars.filter((c) => !c.isPublished).length;

  // ── Search filter ─────────────────────────────────────────────────
  const filtered = allCars.filter((c) => {
    const q = search.toLowerCase();
    return (
      !search ||
      c.name.toLowerCase().includes(q) ||
      c.tag.toLowerCase().includes(q)
    );
  });

  // ── Handlers ─────────────────────────────────────────────────────
  async function handleDelete(id: Id<"cars">) {
    try {
      await deleteCar({ id });
      toast.success("Car deleted");
    } catch {
      toast.error("Failed to delete car");
    }
  }

  async function handleTogglePublish(id: Id<"cars">) {
    try {
      await togglePublished({ id });
      toast.success("Updated");
    } catch {
      toast.error("Failed to update");
    }
  }

  async function handleToggleFeatured(id: Id<"cars">) {
    try {
      await toggleFeatured({ id });
      toast.success("Updated");
    } catch {
      toast.error("Failed to update");
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Cars", value: totalCars },
          { label: "Published", value: totalPublished },
          { label: "Featured", value: totalFeatured },
          { label: "Drafts", value: totalDraft },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border p-4 flex flex-col gap-2"
          >
            <p className="text-xs text-muted-foreground font-medium">
              {s.label}
            </p>
            <p className="text-4xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Cars inventory ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <CardTitle className="text-sm font-medium">All Cars</CardTitle>
              <div className="relative max-w-xs">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search by name or tag..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs"
                />
              </div>
            </div>
            <Link href="/admin/cars/new">
              <Button size="sm" className="text-xs h-8 gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                Add Car
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          {allCars.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-3 flex flex-col gap-2">
                    <div className="h-3 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground text-sm">
              {search ? "No cars match your search." : "No cars added yet."}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {filtered.map((car) => (
                <div key={car._id} className="relative">
                  {/* Three-dot menu */}
                  <div className="absolute top-6 right-6 z-20">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-6 w-6 rounded-full bg-white/90 hover:bg-white shadow-sm"
                        >
                          <EllipsisVertical className="h-3 w-3 text-gray-700" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 text-xs">
                        <DropdownMenuItem
                          className="text-xs"
                          onClick={() =>
                            router.push(`/admin/cars/${car._id}/edit`)
                          }
                        >
                          Edit car
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-xs"
                          onClick={() => handleTogglePublish(car._id)}
                        >
                          {car.isPublished ? "Unpublish" : "Publish"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-xs"
                          onClick={() => handleToggleFeatured(car._id)}
                        >
                          {car.isFeatured
                            ? "Remove featured"
                            : "Mark as featured"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="text-xs text-destructive focus:text-destructive"
                              onSelect={(e) => e.preventDefault()}
                            >
                              Delete car
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete {car.name}?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. The car and all
                                its images will be permanently deleted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-white hover:bg-destructive/90"
                                onClick={() => handleDelete(car._id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <CarCard car={car} adminMode={true} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
