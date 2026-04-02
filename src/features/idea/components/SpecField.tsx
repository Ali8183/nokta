import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SpecFieldProps {
  label: string;
  value: string | null;
  emptyText?: string;
}

export const SpecField: React.FC<SpecFieldProps> = ({ 
  label, 
  value, 
  emptyText = "Not yet defined" 
}) => {
  const hasValue = !!value && value.trim().length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, !hasValue && styles.empty]}>
        {hasValue ? value : emptyText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#38383A',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 1,
  },
  value: {
    fontSize: 18,
    lineHeight: 26,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  empty: {
    color: '#FF453A', // Muted Red
    fontStyle: 'italic',
    fontSize: 16,
    opacity: 0.6,
  },
});
