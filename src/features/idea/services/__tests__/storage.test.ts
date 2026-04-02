import { saveIdea, loadIdea, loadAllIdeas, deleteIdea } from '../storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Idea, MaturityStage } from '../../types';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('Storage Service', () => {
  const mockIdea: Idea = {
    id: 'test-id-123',
    title: 'Drone Delivery',
    spark: 'drone cargo delivery',
    maturity: MaturityStage.DOT,
    messages: [],
    spec: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('successfully saves a new idea and adds it to the index', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));

    await saveIdea(mockIdea);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      `@nokta/idea/${mockIdea.id}`,
      JSON.stringify(mockIdea)
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@nokta/ideas',
      JSON.stringify([mockIdea.id])
    );
  });

  test('handles errors when saving an idea fails due to storage limits', async () => {
    const error = new Error('Storage Full');
    (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(error);

    await expect(saveIdea(mockIdea)).rejects.toThrow('Storage Full');
  });

  test('successfully retrieves an existing idea by ID', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockIdea));

    const result = await loadIdea(mockIdea.id);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(`@nokta/idea/${mockIdea.id}`);
    expect(result).toEqual(mockIdea);
  });
  
  test('returns null when loading a non-existent idea', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const result = await loadIdea('invalid-id');

    expect(result).toBeNull();
  });
});
