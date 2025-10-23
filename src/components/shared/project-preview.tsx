"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ProjectPreviewModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  images: string[];
}

export function ProjectPreviewModal({ open, onClose, title, images }: ProjectPreviewModalProps) {
  const [index, setIndex] = React.useState(0);

  const prevImage = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  React.useEffect(() => {
    if (!open) setIndex(0);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-[90vw] bg-black/20 border border-white/10 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">{title}</DialogTitle>
        </DialogHeader>

        {/* Image Viewer */}
        <div className="relative flex justify-center items-center mt-4">
          <img
            src={images[index]}
            alt={`${title} screenshot ${index + 1}`}
            
            className="rounded-lg max-h-[70vh] object-contain transition-all duration-500"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition"
              >
                <ChevronLeft className="text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition"
              >
                <ChevronRight className="text-white" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-white" : "bg-white/40"
              } transition`}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
