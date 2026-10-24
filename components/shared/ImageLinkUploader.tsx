"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ImageIcon,
  Link as LinkIcon,
  Check,
  X,
  Sparkles,
  ExternalLink,
  AlertCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PRESET_SERVICE_IMAGES = [
  {
    category: "AC Repair",
    label: "AC Servicing",
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "Electrical",
    label: "Circuit Board / Wiring",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "Plumbing",
    label: "Pipe & Valve Repair",
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "Cleaning",
    label: "Deep House Cleaning",
    url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "Painting",
    label: "Wall Painting & Decor",
    url: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "Carpentry",
    label: "Woodwork & Furniture",
    url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop",
  },
];

export const PRESET_PROFILE_AVATARS = [
  {
    category: "Profile",
    label: "Alex Morgan",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  },
  {
    category: "Profile",
    label: "David Chen",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    category: "Profile",
    label: "Marcus Ray",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    category: "Profile",
    label: "Elena Rostova",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
  },
];

export interface ImagePreset {
  category?: string;
  label: string;
  url: string;
}

interface ImageLinkUploaderProps {
  name?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (url: string) => void;
  label?: string;
  placeholder?: string;
  presets?: ImagePreset[];
  aspectRatio?: "video" | "square";
}

export function ImageLinkUploader({
  name = "image",
  defaultValue = "",
  value,
  onChange,
  label = "Service Cover Image",
  placeholder = "Paste image URL (Unsplash, Cloudinary, Imgur, CDN)...",
  presets = PRESET_SERVICE_IMAGES,
  aspectRatio = "video",
}: ImageLinkUploaderProps) {
  const [url, setUrl] = useState(value !== undefined ? value : defaultValue);
  const [imageError, setImageError] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setUrl(value);
      setImageError(false);
    }
  }, [value]);

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    setImageError(false);
    if (onChange) onChange(newUrl);
  };

  const handleClear = () => {
    handleUrlChange("");
  };

  return (
    <div className="space-y-3">
      {/* Label & status */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-primary" />
          <span>{label}</span>
        </label>
        {url && !imageError && (
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            <Check className="w-3 h-3" /> Valid Link
          </span>
        )}
      </div>

      {/* URL Input Row with Clear & Preview Action */}
      <div className="relative flex items-center">
        <LinkIcon className="w-4 h-4 absolute left-3.5 text-muted-foreground/60" />
        <Input
          id={`${name}-url-input`}
          name={name}
          type="url"
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-20 rounded-xl text-xs font-mono bg-background"
        />

        <div className="absolute right-2 flex items-center gap-1">
          {url && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Clear Image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Open Image Link"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Quick Preset Selector */}
      {presets && presets.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Or Choose a High-Resolution Preset:</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset) => {
              const isSelected = url === preset.url;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleUrlChange(preset.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                      : "bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span>{preset.label}</span>
                  {isSelected && <Check className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Live Preview Display Box */}
      {url && (
        <div
          className={`relative rounded-2xl overflow-hidden border border-border bg-muted/30 group shadow-sm ${
            aspectRatio === "square" ? "w-28 h-28 aspect-square" : "aspect-[16/9] max-w-sm"
          }`}
        >
          {!imageError ? (
            <>
              <Image
                unoptimized
                src={url}
                alt="Image Preview"
                fill
                onError={() => setImageError(true)}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                <span className="text-[10px] font-bold text-white drop-shadow">
                  Live Preview
                </span>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center space-y-1">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-[11px] font-bold text-destructive">Preview failed</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
