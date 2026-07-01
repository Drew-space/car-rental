"use client";

import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
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

export default function NewCarPage() {
  const router = useRouter();
  const { user } = useUser();

  const addCar = useMutation(api.cars.addCar);
  const generateUploadUrl = useMutation(api.cars.generateUploadUrl);

  // ── Image state ───────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
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

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
    e.target.value = "";
  }

  function removeImage(index: number) {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadImages(): Promise<{
    coverImageId?: string;
    imageIds: string[];
  }> {
    const ids: string[] = [];
    for (const file of imageFiles) {
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
    return {
      coverImageId: ids[0],
      imageIds: ids.slice(1),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (imageFiles.length === 0)
      return toast.error("Upload at least one image");
    if (!form.name || !form.tag || !form.trans)
      return toast.error("Name, tag and transmission are required");
    if (!form.price) return toast.error("Price is required");
    if (!form.seats || !form.bags)
      return toast.error("Seats and bags are required");

    try {
      setUploading(true);
      const { coverImageId, imageIds } = await uploadImages();

      await addCar({
        name: form.name,
        tag: form.tag,
        trans: form.trans,
        seats: Number(form.seats),
        bags: Number(form.bags),
        rating: form.rating ? Number(form.rating) : 0,
        price: Number(form.price),
        coverImageId: coverImageId as any,
        imageIds: imageIds.length ? (imageIds as any) : undefined,
        description: form.description || undefined,
        whatsapp: form.whatsapp || undefined,
        phone: form.phone || undefined,
        isPublished: form.isPublished,
        isFeatured: form.isFeatured,
        postedBy: user?.id,
      });

      toast.success("Car added successfully!");
      router.push("/admin");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add car");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Car Images</CardTitle>
            <p className="text-xs text-muted-foreground">
              First image will be used as the cover.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {imagePreviews.map((src, i) => (
                <div
                  key={i}
                  className="relative w-28 h-20 rounded-xl overflow-hidden border"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded-full">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
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
                placeholder="e.g. Toyota Yaris"
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
                placeholder="e.g. 5"
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
                placeholder="e.g. 2"
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
                placeholder="e.g. 70"
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
                placeholder="e.g. 4.7"
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
                Uploading...
              </>
            ) : (
              "Add Car"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
