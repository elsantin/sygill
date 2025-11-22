export interface Concept {
  id: string;
  term: string;
  category: string;
  definition: string;
  notes: string;
  codeSnippet: string;
  mastered: boolean;
  favorite: boolean;
  createdAt: number;
  updatedAt: number;
}

export type ConceptFormData = Omit<
  Concept,
  "id" | "createdAt" | "updatedAt" | "mastered" | "favorite"
>;
