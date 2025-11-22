"use client";

import { Concept } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

interface ConceptCardProps {
  concept: Concept;
  onClick: () => void;
}

export function ConceptCard({ concept, onClick }: ConceptCardProps) {
  const { toggleMastery, toggleFavorite } = useStore();

  return (
    <Card
      asMotion
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer group relative overflow-hidden border-opacity-50 hover:border-opacity-100 transition-all duration-300 h-full flex flex-col"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="mystic">{concept.category}</Badge>
          <div className="flex gap-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(concept.id);
              }}
              className={cn(
                "text-muted-foreground hover:text-red-500 transition-colors p-1 rounded-full hover:bg-secondary/50",
                concept.favorite && "text-red-500"
              )}
            >
              <Star
                className={cn("w-4 h-4", concept.favorite && "fill-current")}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMastery(concept.id);
              }}
              className={cn(
                "text-muted-foreground hover:text-amber-600 dark:hover:text-amber-500 transition-all p-1 rounded-full hover:bg-secondary/50",
                concept.mastered &&
                  "text-amber-700 dark:text-amber-500 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20"
              )}
            >
              <Award
                className={cn("w-4 h-4", concept.mastered && "fill-current/20")}
              />
            </button>
          </div>
        </div>
        <CardTitle className="text-xl font-bold tracking-wide">
          {concept.term}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {concept.definition}
        </p>
      </CardContent>
      <div className="absolute inset-0 bg-linear-to-t from-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
}
