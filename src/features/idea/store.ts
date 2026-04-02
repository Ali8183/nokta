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

export const useIdeaStore = create<IdeaStore>((set: any, get: any) => ({
  ideas: [],
  
  addIdea: async (idea: Idea) => {
    await saveIdea(idea);
    set((state: IdeaStore) => ({ ideas: [...state.ideas, idea] }));
  },
  
  updateIdea: async (id: string, updates: Partial<Idea>) => {
    const { ideas } = get();
    const ideaIndex = ideas.findIndex((i: Idea) => i.id === id);
    if (ideaIndex > -1) {
      const updatedIdea = { ...ideas[ideaIndex], ...updates, updatedAt: new Date().toISOString() };
      await saveIdea(updatedIdea);
      
      const newIdeas = [...ideas];
      newIdeas[ideaIndex] = updatedIdea;
      set({ ideas: newIdeas });
    }
  },
  
  deleteIdea: async (id: string) => {
    await storageDeleteIdea(id);
    set((state: IdeaStore) => ({ ideas: state.ideas.filter((i: Idea) => i.id !== id) }));
  },
  
  loadIdeas: async () => {
    const loadedIdeas = await loadAllIdeas();
    set({ ideas: loadedIdeas });
  }
}));
