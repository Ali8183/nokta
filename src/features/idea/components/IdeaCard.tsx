import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Idea } from '../types';
import { MaturityBadge } from './MaturityBadge';

interface IdeaCardProps {
  idea: Idea;
  onPress: (id: string) => void;
  onLongPress: (id: string) => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onPress, onLongPress }) => {
  const formattedDate = new Date(idea.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(idea.id)}
      onLongPress={() => onLongPress(idea.id)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{idea.title || 'Untitled'}</Text>
        <MaturityBadge stage={idea.maturity} />
      </View>
      
      <Text style={styles.spark} numberOfLines={2}>{idea.spark}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.timestamp}>{formattedDate}</Text>
        <Text style={styles.messages}>{idea.messages.length} turns</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E', // Apple Dark Gray
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#38383A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  spark: {
    fontSize: 14,
    lineHeight: 20,
    color: '#EBEBF5', // Apple Secondary Text (Light mode transluscency simulation on Dark)
    opacity: 0.6,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#38383A',
    paddingTop: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
  },
  messages: {
    fontSize: 12,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
});
