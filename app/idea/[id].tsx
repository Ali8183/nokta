import React, { useEffect, useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  Text 
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useIdeaStore } from '../../src/features/idea/globalState';
import { getNextQuestion } from '../../src/services/llm';
import { ChatBubble } from '../../src/features/idea/components/ChatBubble';
import { MessageInput } from '../../src/features/idea/components/MessageInput';
import { MaturityProgress } from '../../src/features/idea/components/MaturityProgress';
import { SpecPreviewButton } from '../../src/features/idea/components/SpecPreviewButton';
import { checkMaturityTransition } from '../../src/features/idea/services/maturity';
import { Message, Idea, MaturityStage } from '../../src/features/idea/types';

export default function IdeaChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ideas, updateIdea } = useIdeaStore();
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const idea = ideas.find((i: Idea) => i.id === id);

  useEffect(() => {
    if (idea && idea.messages.length === 0) {
      sendFirstQuestion();
    }
  }, [id]);

  const sendFirstQuestion = async () => {
    if (!idea) return;
    setIsLoading(true);
    const question = await getNextQuestion(idea, []);
    const newMessage: Message = {
      id: Math.random().toString(36).substring(2, 11),
      role: 'assistant',
      content: question,
      timestamp: new Date().toISOString(),
      turnNumber: 0,
    };
    await updateIdea(id, { messages: [newMessage] });
    setIsLoading(false);
  };

  const handleSend = async (content: string) => {
    if (!idea || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 11),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      turnNumber: idea.messages.length,
    };

    const updatedMessages = [...idea.messages, userMessage];
    
    // Check for maturity transition (simplified for Phase 3)
    // Normally we'd extract fields from the user message via LLM here
    const nextMaturity = checkMaturityTransition({ ...idea, messages: updatedMessages });
    
    await updateIdea(id, { 
      messages: updatedMessages,
      maturity: nextMaturity || idea.maturity,
      updatedAt: new Date().toISOString()
    });

    const assistantQuestion = await getNextQuestion(idea, updatedMessages);
    const assistantMessage: Message = {
      id: Math.random().toString(36).substring(2, 11),
      role: 'assistant',
      content: assistantQuestion,
      timestamp: new Date().toISOString(),
      turnNumber: updatedMessages.length,
    };

    await updateIdea(id, { 
      messages: [...updatedMessages, assistantMessage],
      updatedAt: new Date().toISOString()
    });
    
    setIsLoading(false);
  };

  if (!idea) return null;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Stack.Screen options={{ title: idea.title || 'Idea Refinement' }} />
      <MaturityProgress currentStage={idea.maturity} />
      
      <FlatList
        ref={flatListRef}
        data={idea.messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble role={item.role} content={item.content} />}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <SpecPreviewButton id={idea.id} stage={idea.maturity} />
      
      <MessageInput onSend={handleSend} isLoading={isLoading} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  listContent: {
    paddingVertical: 16,
    paddingBottom: 100,
  },
});
