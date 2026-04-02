import AsyncStorage from '@react-native-async-storage/async-storage';
import { Idea } from '../types';

const IDEAS_LIST_KEY = '@nokta/ideas';
const IDEA_KEY_PREFIX = '@nokta/idea/';

export async function saveIdea(idea: Idea): Promise<void> {
  try {
    const ideaKey = `${IDEA_KEY_PREFIX}${idea.id}`;
    await AsyncStorage.setItem(ideaKey, JSON.stringify(idea));

    const listStr = await AsyncStorage.getItem(IDEAS_LIST_KEY);
    const list: string[] = listStr ? JSON.parse(listStr) : [];
    
    if (!list.includes(idea.id)) {
      list.push(idea.id);
      await AsyncStorage.setItem(IDEAS_LIST_KEY, JSON.stringify(list));
    }
  } catch (error) {
    console.error('saveIdea error:', error);
    throw error;
  }
}

export async function loadIdea(id: string): Promise<Idea | null> {
  try {
    const ideaKey = `${IDEA_KEY_PREFIX}${id}`;
    const ideaStr = await AsyncStorage.getItem(ideaKey);
    return ideaStr ? JSON.parse(ideaStr) : null;
  } catch (error) {
    console.error('loadIdea error:', error);
    throw error;
  }
}

export async function loadAllIdeas(): Promise<Idea[]> {
  try {
    const listStr = await AsyncStorage.getItem(IDEAS_LIST_KEY);
    const list: string[] = listStr ? JSON.parse(listStr) : [];
    
    const ideas: Idea[] = [];
    for (const id of list) {
      const idea = await loadIdea(id);
      if (idea) {
        ideas.push(idea);
      }
    }
    return ideas;
  } catch (error) {
    console.error('loadAllIdeas error:', error);
    throw error;
  }
}

export async function deleteIdea(id: string): Promise<void> {
  try {
    const listStr = await AsyncStorage.getItem(IDEAS_LIST_KEY);
    const list: string[] = listStr ? JSON.parse(listStr) : [];
    
    const updatedList = list.filter((itemId) => itemId !== id);
    await AsyncStorage.setItem(IDEAS_LIST_KEY, JSON.stringify(updatedList));
    
    const ideaKey = `${IDEA_KEY_PREFIX}${id}`;
    await AsyncStorage.removeItem(ideaKey);
  } catch (error) {
    console.error('deleteIdea error:', error);
    throw error;
  }
}
