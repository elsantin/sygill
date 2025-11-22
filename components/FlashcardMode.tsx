"use client";

import { useState, useEffect, useCallback } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardModeProps {
  onClose: () => void;
}

export function FlashcardMode({ onClose }: FlashcardModeProps) {
  const { concepts, toggleMastery } = useStore();
  const [shuffledConcepts] = useState(() =>
    [...concepts].sort(() => Math.random() - 0.5)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentConcept = shuffledConcepts[currentIndex];

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledConcepts.length);
    }, 300);
  }, [shuffledConcepts.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + shuffledConcepts.length) % shuffledConcepts.length
      );
    }, 300);
  }, [shuffledConcepts.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Arrow keys for navigation
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
        return;
      }

      // Space to flip card
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        handleFlip();
        return;
      }

      // M to toggle mastery
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        if (currentConcept) {
          toggleMastery(currentConcept.id);
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    onClose,
    currentConcept,
    toggleMastery,
    handleNext,
    handlePrev,
    handleFlip,
  ]);

  if (!currentConcept) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md p-4">
      <Button
        variant="ghost"
        className="absolute top-4 right-4"
        onClick={onClose}
      >
        <X className="mr-2 h-4 w-4" /> Exit Study Mode
      </Button>

      <div className="w-full max-w-2xl" style={{ perspective: "1000px" }}>
        <motion.div
          className="relative h-[400px] w-full cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          onClick={handleFlip}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <Card
            className="absolute inset-0 flex flex-col items-center justify-center p-8 border-2 border-indigo-500/20 bg-card/50"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Term
            </span>
            <h2 className="text-4xl font-bold text-center">
              {currentConcept.term}
            </h2>
            <p className="mt-8 text-sm text-muted-foreground animate-pulse">
              Click to reveal
            </p>
          </Card>

          {/* Back */}
          <Card
            className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-card/50 border-2 border-indigo-500/20"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Definition
            </span>
            <p className="text-xl text-center leading-relaxed">
              {currentConcept.definition}
            </p>

            <div
              className="mt-8 flex gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant={currentConcept.mastered ? "secondary" : "outline"}
                onClick={() => toggleMastery(currentConcept.id)}
                className={cn(currentConcept.mastered && "text-green-500")}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {currentConcept.mastered ? "Mastered" : "Mark as Mastered"}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handlePrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-mono">
          {currentIndex + 1} / {shuffledConcepts.length}
        </span>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
