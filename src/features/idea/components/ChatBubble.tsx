import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  userColor?: string;
  assistantColor?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  role, 
  content,
  userColor = '#007AFF',
  assistantColor = '#1C1C1E'
}) => {
  const isUser = role === 'user';
  
  return (
    <View style={[
      styles.container, 
      isUser ? styles.userContainer : styles.assistantContainer
    ]}>
      <View style={[
        styles.bubble, 
        isUser ? { backgroundColor: userColor } : { backgroundColor: assistantColor },
        isUser ? styles.userBubble : styles.assistantBubble
      ]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.assistantText]}>
          {content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginVertical: 4,
    flexDirection: 'row',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  assistantContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#38383A',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  assistantText: {
    color: '#EBEBF5',
  },
});
