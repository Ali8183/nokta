import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SparkOriginProps {
  spark: string;
  highlighted?: boolean;
}

export const SparkOrigin: React.FC<SparkOriginProps> = ({ spark, highlighted = true }) => {
  return (
    <View style={[styles.container, highlighted && styles.highlighted]}>
      <Text style={styles.label}>Where it all began</Text>
      <Text style={styles.content}>{spark}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1C1C1E', // Apple Dark secondary background
    borderRadius: 12,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#38383A',
  },
  highlighted: {
    borderColor: '#0A84FF', // Maturity Blue to highlight origin
    borderStyle: 'dashed',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 2,
    textAlign: 'center',
  },
  content: {
    fontSize: 22,
    fontWeight: '300',
    color: '#FFFFFF',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 32,
  },
});
