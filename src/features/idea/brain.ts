import { create } from 'zustand';
import { Idea } from './types';
import { loadAllIdeas, saveIdea, deleteIdea as storageDeleteIdea } from './services/storage';

interface IdeaStore {
  ideas: Idea[];
  addIdea: (idea: Idea) => Promise<void>;
  updateIdea: (id: string, updates: Partial<Idea>) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
  loadIdeas: () => Promise<void>;
}

export const useIdeaStore = create<IdeaStore>((setter: any, getter: any) => ({
  ideas: [],
  addIdea: async (idea: Idea) => {
    await saveIdea(idea);
    setter((state: IdeaStore) => ({ ideas: [...state.ideas, idea] }));
  },
  updateIdea: async (id: string, updates: Partial<Idea>) => {
    const list = getter().ideas;
    const idx = list.findIndex((i: Idea) => i.id === id);
    if (idx > -1) {
      const merged = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
      await saveIdea(merged);
      const next = [...list];
      next[idx] = merged;
      setter({ ideas: next });
    }
  },
  deleteIdea: async (id: string) => {
    await storageDeleteIdea(id);
    setter((state: IdeaStore) => ({ ideas: state.ideas.filter((i: Idea) => i.id !== id) }));
  },
  loadIdeas: async () => {
    const data = await loadAllIdeas();
    setter({ ideas: data });
  },
}));



