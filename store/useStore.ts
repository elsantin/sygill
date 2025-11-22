import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Concept, ConceptFormData } from "@/types";
import { SEED_DATA } from "@/lib/seed-data";
import { v4 as uuidv4 } from "uuid";

interface StoreState {
  concepts: Concept[];
  searchQuery: string;
  filterCategory: string | null;
  filterMastered: boolean | null;
  filterFavorite: boolean | null;
  systemPrompt: string;

  // Actions
  addConcept: (data: ConceptFormData) => void;
  updateConcept: (id: string, data: Partial<Concept>) => void;
  deleteConcept: (id: string) => void;
  toggleMastery: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: string | null) => void;
  setFilterMastered: (mastered: boolean | null) => void;
  setFilterFavorite: (favorite: boolean | null) => void;
  setSystemPrompt: (prompt: string) => void;
  seedDatabase: () => void;
  importConcepts: (concepts: Concept[]) => void;
  resetDatabase: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      concepts: [],
      searchQuery: "",
      filterCategory: null,
      filterMastered: null,
      filterFavorite: null,
      systemPrompt:
        "You are Sygill AI, a mystical and wise study assistant. You help the user master concepts from their Grimoire.",

      addConcept: (data) => {
        const newConcept: Concept = {
          ...data,
          id: uuidv4(),
          mastered: false,
          favorite: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({ concepts: [newConcept, ...state.concepts] }));
      },

      updateConcept: (id, data) => {
        set((state) => ({
          concepts: state.concepts.map((c) =>
            c.id === id ? { ...c, ...data, updatedAt: Date.now() } : c
          ),
        }));
      },

      deleteConcept: (id) => {
        set((state) => ({
          concepts: state.concepts.filter((c) => c.id !== id),
        }));
      },

      toggleMastery: (id) => {
        set((state) => ({
          concepts: state.concepts.map((c) =>
            c.id === id ? { ...c, mastered: !c.mastered } : c
          ),
        }));
      },

      toggleFavorite: (id) => {
        set((state) => ({
          concepts: state.concepts.map((c) =>
            c.id === id ? { ...c, favorite: !c.favorite } : c
          ),
        }));
      },

      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilterCategory: (category) => set({ filterCategory: category }),
      setFilterMastered: (mastered) => set({ filterMastered: mastered }),
      setFilterFavorite: (favorite) => set({ filterFavorite: favorite }),
      setSystemPrompt: (prompt) => set({ systemPrompt: prompt }),

      seedDatabase: () => {
        const currentConcepts = get().concepts;
        // Allow seeding if we have fewer than 20 concepts (likely just the old seed data or empty)
        if (currentConcepts.length >= 20) return;

        const seedConcepts: Concept[] = SEED_DATA.map((data) => ({
          ...data,
          id: uuidv4(),
          mastered: false,
          favorite: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }));

        set({ concepts: seedConcepts });
      },

      importConcepts: (importedConcepts: Concept[]) => {
        set({ concepts: importedConcepts });
      },

      resetDatabase: () => {
        set({ concepts: [] });
      },
    }),
    {
      name: "sygill-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
