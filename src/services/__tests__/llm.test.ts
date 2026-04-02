import { getNextQuestion } from '../llm';
import { Idea, Message, MaturityStage } from '../../features/idea/types';

describe('LLM Service', () => {
  const mockIdea: Idea = {
    id: 'test-llm',
    title: 'Test',
    spark: 'test spark',
    maturity: MaturityStage.DOT,
    messages: [],
    spec: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  test('successfully returns sequential mock responses based on maturity and conversation length', async () => {
    // Turn 0
    const q1 = await getNextQuestion(mockIdea, []);
    expect(q1).toContain('Interesting spark');
    
    // Simulate progression to turn 2
    mockIdea.messages = [
      { id: '1', role: 'assistant', content: q1, timestamp: '', turnNumber: 0 },
      { id: '2', role: 'user', content: 'answer', timestamp: '', turnNumber: 1 }
    ];
    
    const q2 = await getNextQuestion(mockIdea, mockIdea.messages);
    expect(q2).toContain('Who suffers from this problem the most?');
  });

  test('gracefully falls back to a generic response when the conversation length exceeds mapped turns', async () => {
    // Generate an unusual amount of messages for DOT maturity
    const manyMessages = new Array(8).fill(null).map((_, i): Message => ({
      id: String(i),
      role: i % 2 === 0 ? 'assistant' : 'user',
      content: 'test',
      timestamp: '',
      turnNumber: i
    }));

    const response = await getNextQuestion(mockIdea, manyMessages);
    expect(response).toBe('Can you elaborate on that? More detail will help us refine your idea further.');
  });
});
