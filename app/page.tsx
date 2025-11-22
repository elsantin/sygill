"use client";

import { useEffect, useState, useMemo } from "react";
import { useStore } from "@/store/useStore";
import { ConceptCard } from "@/components/ConceptCard";
import { Button } from "@/components/ui/button";
import { Plus, Database, BookOpen, Feather } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { v4 as uuidv4 } from "uuid";

import { Modal } from "@/components/ui/modal";
import { ConceptDetail } from "@/components/ConceptDetail";
import { FlashcardMode } from "@/components/FlashcardMode";
import { AIChatInterface } from "@/components/AIChatInterface";

import { Concept } from "@/types";

export default function Home() {
  const { concepts, searchQuery, seedDatabase, addConcept } = useStore();
  const [isMounted, setIsMounted] = useState(false);
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudyMode, setIsStudyMode] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const filteredConcepts = useMemo(() => {
    if (!searchQuery) return concepts;

    const fuse = new Fuse(concepts, {
      keys: ["term", "definition", "category", "notes"],
      threshold: 0.3,
    });

    return fuse.search(searchQuery).map((r) => r.item);
  }, [concepts, searchQuery]);

  const handleConceptClick = (concept: Concept) => {
    setActiveConcept(concept);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleNewEntry = () => {
    const newConcept: Concept = {
      id: uuidv4(),
      term: "New Concept",
      category: "General",
      definition: "Write a short definition here...",
      notes: "Add detailed notes here...",
      codeSnippet: "",
      mastered: false,
      favorite: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    addConcept(newConcept);
    setActiveConcept(newConcept);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setActiveConcept(null);
      setIsEditMode(false);
    }, 300);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsStudyMode(true)}>
            <Feather className="mr-2 h-4 w-4" /> Study Mode
          </Button>
          <Button onClick={handleNewEntry}>
            <Plus className="mr-2 h-4 w-4" /> New Entry
          </Button>
        </div>
      </div>

      {concepts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
          <div className="p-6 rounded-full bg-secondary/50 backdrop-blur-sm">
            <Database className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">The Grimoire is Empty</h2>
          <p className="text-muted-foreground max-w-md">
            Begin your journey by seeding the database with ancient knowledge or
            create your first entry.
          </p>
          <Button onClick={seedDatabase} size="lg" className="mt-4">
            <BookOpen className="mr-2 h-4 w-4" /> Seed Database
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredConcepts.map((concept) => (
              <motion.div
                key={concept.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ConceptCard
                  concept={concept}
                  onClick={() => handleConceptClick(concept)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {activeConcept && (
          <ConceptDetail
            key={activeConcept.id}
            concept={activeConcept}
            onClose={handleCloseModal}
            initialEditMode={isEditMode}
          />
        )}
      </Modal>

      {isStudyMode && <FlashcardMode onClose={() => setIsStudyMode(false)} />}
      <AIChatInterface />
    </div>
  );
}
