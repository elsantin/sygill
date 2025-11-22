"use client";

import { useState, useEffect } from "react";
import { Concept, ConceptFormData } from "@/types";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Award, Star, Edit2, Trash2, Code, Save } from "lucide-react";
import GoldenSmoke from "@/components/GoldenSmoke";
import { openInCodePen } from "@/lib/codepen";
import { cn } from "@/lib/utils";

interface ConceptDetailProps {
  concept: Concept;
  onClose: () => void;
  onNavigate?: (direction: "next" | "prev") => void;
  initialEditMode?: boolean;
}

export function ConceptDetail({
  concept,
  onClose,
  onNavigate,
  initialEditMode = false,
}: ConceptDetailProps) {
  const {
    updateConcept,
    deleteConcept,
    toggleMastery,
    toggleFavorite,
    concepts,
  } = useStore();
  const [formData, setFormData] = useState<ConceptFormData>({
    term: concept.term,
    category: concept.category,
    definition: concept.definition,
    notes: concept.notes,
    codeSnippet: concept.codeSnippet,
  });
  const [showSmoke, setShowSmoke] = useState(false);

  const [isEditing, setIsEditing] = useState(initialEditMode);

  useEffect(() => {
    if (concept.mastered) {
      // Use setTimeout to avoid synchronous state update warning
      const showTimer = setTimeout(() => {
        setShowSmoke(true);
      }, 0);

      const hideTimer = setTimeout(() => setShowSmoke(false), 3000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [concept.mastered]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keyboard shortcuts if we're editing
      if (isEditing) return;

      // Arrow keys for navigation
      if ((e.key === "ArrowRight" || e.key === "ArrowLeft") && onNavigate) {
        e.preventDefault();
        onNavigate(e.key === "ArrowRight" ? "next" : "prev");
        return;
      }

      // E to edit
      if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        setIsEditing(true);
        return;
      }

      // S to toggle favorite (Star)
      if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        toggleFavorite(concept.id);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing, onNavigate, concept.id, toggleFavorite]);

  const handleSave = () => {
    updateConcept(concept.id, formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this concept?")) {
      deleteConcept(concept.id);
      onClose();
    }
  };

  const renderWikiText = (text: string) => {
    const parts = text.split(/(\[\[.*?\]\])/g);
    return parts.map((part, index) => {
      if (part.startsWith("[[") && part.endsWith("]]")) {
        const term = part.slice(2, -2);
        const exists = concepts.some(
          (c) => c.term.toLowerCase() === term.toLowerCase()
        );
        return (
          <span
            key={index}
            className={cn(
              "font-semibold transition-colors",
              exists
                ? "text-amber-600 dark:text-amber-400 cursor-help hover:text-amber-700 dark:hover:text-amber-300 hover:underline decoration-wavy decoration-amber-500/50"
                : "text-muted-foreground/60"
            )}
            title={exists ? "Linked Concept" : "Concept not found"}
          >
            {term}
          </span>
        );
      }
      return part;
    });
  };

  if (isEditing) {
    return (
      <div className="space-y-4 min-h-[400px] bg-[#fdfbf7] dark:bg-black/20 text-foreground p-6 rounded-xl border-2 border-stone-200 dark:border-white/10 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Edit Concept</h2>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Term</label>
            <Input
              value={formData.term}
              onChange={(e) =>
                setFormData({ ...formData, term: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Category</label>
            <Input
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Definition</label>
            <Textarea
              value={formData.definition}
              onChange={(e) =>
                setFormData({ ...formData, definition: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Notes (Supports [[WikiLinks]])
            </label>
            <Textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="min-h-[150px]"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Code Snippet</label>
            <Textarea
              value={formData.codeSnippet}
              onChange={(e) =>
                setFormData({ ...formData, codeSnippet: e.target.value })
              }
              className="font-mono min-h-[150px]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4">
      {showSmoke && <GoldenSmoke />}

      <div className="flex justify-between items-start">
        <div>
          <Badge variant="mystic" className="mb-2">
            {concept.category}
          </Badge>
          <h2 className="text-3xl font-bold tracking-wide">{concept.term}</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(concept.id)}
            className={cn(
              concept.favorite && "text-red-500 hover:text-red-600"
            )}
          >
            <Star
              className={cn("h-5 w-5", concept.favorite && "fill-current")}
            />
          </Button>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-4 italic">
          {concept.definition}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Grimoire Notes
        </h3>
        <div className="whitespace-pre-wrap leading-relaxed text-foreground/90">
          {renderWikiText(concept.notes)}
        </div>
      </div>

      {concept.codeSnippet && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Incantation
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={() => openInCodePen(concept.codeSnippet, concept.term)}
            >
              <Code className="mr-2 h-3 w-3" /> Open in CodePen
            </Button>
          </div>
          <div className="rounded-md overflow-hidden border border-white/10 shadow-inner bg-[#282c34]">
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                background: "transparent",
              }}
              showLineNumbers
            >
              {concept.codeSnippet}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      <div className="pt-6 flex justify-end">
        <Button
          variant={concept.mastered ? "secondary" : "outline"}
          size="lg"
          onClick={() => toggleMastery(concept.id)}
          className={cn(
            "w-full sm:w-auto transition-all duration-500 border-2",
            concept.mastered
              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/50 hover:bg-amber-500/20"
              : "border-dashed border-muted-foreground/30 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-500"
          )}
        >
          <Award
            className={cn("mr-2 h-5 w-5", concept.mastered && "fill-current")}
          />
          {concept.mastered ? "Knowledge Sealed" : "Seal Knowledge"}
        </Button>
      </div>
    </div>
  );
}
