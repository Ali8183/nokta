import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaturityStage } from '../types';

interface SpecPreviewButtonProps {
  id: string;
  stage: MaturityStage;
}

export const SpecPreviewButton: React.FC<SpecPreviewButtonProps> = ({ id, stage }) => {
  const router = useRouter();
  const isVisible = stage === MaturityStage.PARAGRAPH || stage === MaturityStage.PAGE;

  if (!isVisible) return null;

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/idea/spec/${id}`)}
    >
      <Text style={styles.text}>View Spec Table 📄</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: '#30D158', // Green for positive/complete action
    position: 'absolute',
    bottom: 100,
    right: 24,
    shadowColor: '#30D158',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
