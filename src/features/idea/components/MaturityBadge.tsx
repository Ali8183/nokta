import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaturityStage } from '../types';

interface MaturityBadgeProps {
  stage: MaturityStage;
}

const STAGE_CONFIG = {
  [MaturityStage.DOT]: { label: '●', color: '#8E8E93', name: 'Dot' },
  [MaturityStage.LINE]: { label: '━', color: '#FFD60A', name: 'Line' },
  [MaturityStage.PARAGRAPH]: { label: '¶', color: '#0A84FF', name: 'Paragraph' },
  [MaturityStage.PAGE]: { label: '📄', color: '#30D158', name: 'Page' },
};

export const MaturityBadge: React.FC<MaturityBadgeProps> = ({ stage }) => {
  const config = STAGE_CONFIG[stage] || STAGE_CONFIG[MaturityStage.DOT];
  
  return (
    <View style={[styles.container, { backgroundColor: config.color + '20' }]}>
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
      <Text style={[styles.name, { color: config.color }]}>{config.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  name: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
