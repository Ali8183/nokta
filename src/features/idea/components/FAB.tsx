import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

interface FABProps {
  onPress: () => void;
  icon?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const FAB: React.FC<FABProps> = ({ 
  onPress, 
  icon = '+',
  position = 'bottom-right' 
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.container, styles[position]]}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{icon}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF', // Standard Blue
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  'bottom-right': {
    bottom: 30,
    right: 24,
  },
  'bottom-left': {
    bottom: 30,
    left: 24,
  },
  'top-right': {
    top: 30,
    right: 24,
  },
  'top-left': {
    top: 30,
    left: 24,
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '300',
  },
});
