"use client";

import { use, useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImagePlus, X, Loader2 } from "lucide-react";

const CAR_TAGS = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Minivan",
  "MPV",
  "Sports",
  "Truck",
  "Coupe",
  "Convertible",
  "Van",
];
const TRANSMISSIONS = ["Automatic", "Manual", "Automatic/Manual"];

export default function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const car = useQuery(api.cars.getCarById, { id: id as Id<"cars"> });
  const editCar = useMutation(api.cars.editCar);
  const generateUploadUrl = useMutation(api.cars.generateUploadUrl);

  // ── Image state ───────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [existingCoverUrl, setExistingCoverUrl] = useState<string | null>(null);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // ── Form state ────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name: "",
    tag: "Sedan",
    trans: "Automatic",
    seats: "",
    bags: "",
    rating: "",
    price: "",
    description: "",
    whatsapp: "",
    phone: "",
    isPublished: true,
    isFeatured: false,
  });

  // ── Pre-fill once car loads ───────────────────────────────────────
  // useEffect(() => {
  //   if (!car) return;
  //   setForm({
  //     name: car.name,
  //     tag: car.tag,
  //     trans: car.trans,
  //     seats: car.seats.toString(),
  //     bags: car.bags.toString(),
  //     rating: car.rating.toString(),
  //     price: car.price.toString(),
  //     description: car.description ?? "",
  //     whatsapp: car.whatsapp ?? "",
  //     phone: car.phone ?? "",
  //     isPublished: car.isPublished,
  //     isFeatured: car.isFeatured,
  //   });
  //   setExistingCoverUrl(car.coverImageUrl ?? null);
  //   setExistingImageUrls(car.imageUrls ?? []);
  // }, [car]);
  useEffect(() => {
    if (!car) return;
    setForm({
      name: car.name,
      tag: car.tag,
      trans: car.trans,
      seats: car.seats.toString(),
      bags: car.bags.toString(),
      rating: car.rating.toString(),
      price: car.price.toString(),
      description: car.description ?? "",
      whatsapp: car.whatsapp ?? "",
      phone: car.phone ?? "",
      isPublished: car.isPublished,
      isFeatured: car.isFeatured,
    });
    setExistingCoverUrl(car.coverImageUrl ?? null);
    setExistingImageUrls(
      (car.imageUrls ?? []).filter((url): url is string => url !== null),
    );
  }, [car]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setNewFiles((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
    e.target.value = "";
  }

  function removeNew(index: number) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadNewImages(): Promise<string[]> {
    const ids: string[] = [];
    for (const file of newFiles) {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error("Image upload failed");
      const { storageId } = await res.json();
      ids.push(storageId);
    }
    return ids;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const hasImages = existingCoverUrl || newFiles.length > 0;
    if (!hasImages) return toast.error("At least one image is required");

    try {
      setUploading(true);
      const newIds = await uploadNewImages();

      await editCar({
        id: id as Id<"cars">,
        name: form.name,
        tag: form.tag,
        trans: form.trans,
        seats: Number(form.seats),
        bags: Number(form.bags),
        rating: Number(form.rating),
        price: Number(form.price),
        // Only update coverImageId if new cover uploaded
        coverImageId: newIds[0] ? (newIds[0] as any) : undefined,
        imageIds: newIds.slice(1).length ? (newIds.slice(1) as any) : undefined,
        description: form.description || undefined,
        whatsapp: form.whatsapp || undefined,
        phone: form.phone || undefined,
        isPublished: form.isPublished,
        isFeatured: form.isFeatured,
      });

      toast.success("Car updated!");
      router.push("/admin");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update car");
    } finally {
      setUploading(false);
    }
  }

  if (car === undefined) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (car === null) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-muted-foreground text-sm">Car not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Car Images</CardTitle>
            <p className="text-xs text-muted-foreground">
              Add new images. Existing cover is kept unless you upload a new
              one.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {/* Existing cover */}
              {existingCoverUrl && (
                <div className="relative w-28 h-20 rounded-xl overflow-hidden border">
                  <img
                    src={existingCoverUrl}
                    alt="cover"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded-full">
                    Cover
                  </span>
                </div>
              )}
              {/* Existing gallery */}
              {existingImageUrls.map((src, i) => (
                <div
                  key={i}
                  className="relative w-28 h-20 rounded-xl overflow-hidden border"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* New previews */}
              {newPreviews.map((src, i) => (
                <div
                  key={i}
                  className="relative w-28 h-20 rounded-xl overflow-hidden border border-foreground"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded-full">
                    New
                  </span>
                  <button
                    type="button"
                    onClick={() => removeNew(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-28 h-20 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-foreground transition-colors flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <ImagePlus className="w-5 h-5" />
                <span className="text-[10px]">Add image</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>
          </CardContent>
        </Card>

        {/* Core Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Core Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label className="text-xs">Car Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Tag *</Label>
              <Select value={form.tag} onValueChange={(v) => set("tag", v)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CAR_TAGS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Transmission *</Label>
              <Select value={form.trans} onValueChange={(v) => set("trans", v)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TRANSMISSIONS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Seats *</Label>
              <Input
                type="number"
                min={1}
                max={20}
                value={form.seats}
                onChange={(e) => set("seats", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Bags *</Label>
              <Input
                type="number"
                min={0}
                value={form.bags}
                onChange={(e) => set("bags", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Price per Day ($) *</Label>
              <Input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Rating (0–5)</Label>
              <Input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={(e) => set("rating", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Contact{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">WhatsApp</Label>
              <Input
                placeholder="+2348012345678"
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Phone</Label>
              <Input
                placeholder="+2348012345678"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Description{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write a short description..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className="text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Publish Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Publish Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Publish listing</p>
                <p className="text-xs text-muted-foreground">
                  Make this car visible on the public site
                </p>
              </div>
              <Switch
                checked={form.isPublished}
                onCheckedChange={(v) => set("isPublished", v)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Mark as featured</p>
                <p className="text-xs text-muted-foreground">
                  Show on the homepage featured section
                </p>
              </div>
              <Switch
                checked={form.isFeatured}
                onCheckedChange={(v) => set("isFeatured", v)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-3 pb-8">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
