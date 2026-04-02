/* eslint-disable */
import { create } from 'zustand';
import { Idea } from './types';
import { loadAllIdeas, saveIdea, deleteIdea as wipe } from './services/storage';

interface Brain {
  ideas: Idea[];
  addIdea: (d: Idea) => Promise<void>;
  updateIdea: (id: string, c: Partial<Idea>) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
  loadIdeas: () => Promise<void>;
}

export const useIdeaStore = create<Brain>((s: any, g: any) => ({
  ideas: [],
  addIdea: async (d: Idea) => {
    await saveIdea(d);
    s((st: Brain) => ({ ideas: [...st.ideas, d] }));
  },
  updateIdea: async (id: string, c: Partial<Idea>) => {
    const list = g().ideas;
    const pos = list.findIndex((x: Idea) => x.id === id);
    if (pos > -1) {
      const item = { ...list[pos], ...c, updatedAt: new Date().toISOString() };
      await saveIdea(item);
      const next = [...list];
      next[pos] = item;
      s({ ideas: next });
    }
  },
  deleteIdea: async (id: string) => {
    await wipe(id);
    s((st: Brain) => ({ ideas: st.ideas.filter((x: Idea) => x.id !== id) }));
  },
  loadIdeas: async () => {
    const data = await loadAllIdeas();
    s({ ideas: data });
  },
}));
