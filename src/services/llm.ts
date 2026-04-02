import { Idea, Message } from '../features/idea/types';
import { FEATURES } from '../config/features';

// Since we cannot use fs in React Native, we import or fetch the mock responses.
// In Expo, local JSON files can be imported directly.
import mockResponses from '../mock/llm-responses.json';

type MockResponsesType = Record<string, string>;
const responses = mockResponses as MockResponsesType;

function getMockResponse(maturity: string, messagesLength: number): string {
  const key = `${maturity}_turn_${messagesLength}`;
  return responses[key] || responses['fallback'];
}

async function callLiveAPI(idea: Idea, messages: Message[]): Promise<string> {
  // To be implemented in v0.2+ when backend is available.
  throw new Error("Live API not yet implemented");
}

export async function getNextQuestion(idea: Idea, messages: Message[]): Promise<string> {
  if (FEATURES.MOCK_LLM) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return getMockResponse(idea.maturity, messages.length);
  }
  return callLiveAPI(idea, messages);
}
