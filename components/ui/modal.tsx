"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-9999 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div
              className={cn(
                "relative w-full rounded-xl border shadow-2xl pointer-events-auto transition-all",
                // Fixed colors: White for light mode, Zinc-950 for dark mode
                // Fixed colors: White for light mode, Zinc-950 for dark mode
                "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-zinc-200 dark:border-white/10 brightness-110 dark:brightness-100",
                "text-zinc-950 dark:text-zinc-50",
                // Add padding to content
                "p-6 sm:p-8",
                // Prevent horizontal overflow
                "overflow-x-hidden",
                // Larger default width
                "max-w-4xl mx-auto",
                className
              )}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full p-1 opacity-70 ring-offset-background transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
