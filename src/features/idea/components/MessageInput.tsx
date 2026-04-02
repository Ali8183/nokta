import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';

interface MessageInputProps {
  onSend: (text: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ 
  onSend, 
  isLoading = false,
  placeholder = "Refine your idea..."
}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        value={text}
        onChangeText={setText}
        editable={!isLoading}
        multiline
      />
      <TouchableOpacity 
        style={[styles.sendButton, (!text.trim() || isLoading) && styles.disabled]}
        onPress={handleSend}
        disabled={!text.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#007AFF" size="small" />
        ) : (
          <Text style={styles.sendText}>Send</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#38383A',
  },
  input: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
    maxHeight: 120,
    marginRight: 8,
  },
  sendButton: {
    width: 60,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: 'transparent',
  },
  sendText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
