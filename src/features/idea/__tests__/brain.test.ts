import { act } from '@testing-library/react-native';
import { Idea, MaturityStage } from '../types';

// Virtual mock of purely basic zustand create
jest.mock('zustand', () => {
  return {
    create: (setup: any) => {
      let state: any;
      const set = (updater: any) => {
        const updates = typeof updater === 'function' ? updater(state) : updater;
        state = { ...state, ...updates };
      };
      const get = () => state;
      state = setup(set, get);
      
      const useStore = () => state;
      useStore.getState = get;
      useStore.setState = set;
      return useStore;
    }
  };
}, { virtual: true });

// Mock storage
jest.mock('../services/storage', () => ({
  saveIdea: jest.fn(),
  loadAllIdeas: jest.fn().mockResolvedValue([]),
  deleteIdea: jest.fn(),
}));

import { useIdeaStore } from '../brain';
import { saveIdea, deleteIdea } from '../services/storage';

describe('useIdeaStore', () => {
  beforeEach(() => {
    act(() => {
      useIdeaStore.setState({ ideas: [] });
    });
    jest.clearAllMocks();
  });

  const mockIdea: Idea = {
    id: 'store-test-1',
    title: 'Store Test',
    spark: 'test spark',
    maturity: MaturityStage.DOT,
    messages: [],
    spec: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  test('successfully adds a new idea to state and persists to storage', async () => {
    await act(async () => {
      await useIdeaStore.getState().addIdea(mockIdea);
    });

    const state = useIdeaStore.getState();
    expect(state.ideas).toHaveLength(1);
    expect(state.ideas[0].id).toBe(mockIdea.id);
    expect(saveIdea).toHaveBeenCalledWith(mockIdea);
  });

  test('successfully deletes an idea from state and removes from storage', async () => {
    // initialize state
    act(() => {
      useIdeaStore.setState({ ideas: [mockIdea] });
    });

    await act(async () => {
      await useIdeaStore.getState().deleteIdea(mockIdea.id);
    });

    const state = useIdeaStore.getState();
    expect(state.ideas).toHaveLength(0);
    expect(deleteIdea).toHaveBeenCalledWith(mockIdea.id);
  });

  test('silently prevents state changes when updating a non-existent idea', async () => {
    await act(async () => {
      await useIdeaStore.getState().updateIdea('non-existent', { title: 'New Title' });
    });

    const state = useIdeaStore.getState();
    expect(state.ideas).toHaveLength(0);
    expect(saveIdea).not.toHaveBeenCalled();
  });
});
