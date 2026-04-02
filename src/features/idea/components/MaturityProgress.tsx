import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaturityStage } from '../types';

interface MaturityProgressProps {
  currentStage: MaturityStage;
  position?: 'top' | 'bottom';
}

const STAGES = [
  MaturityStage.DOT,
  MaturityStage.LINE,
  MaturityStage.PARAGRAPH,
  MaturityStage.PAGE,
];

const STAGE_LABELS = {
  [MaturityStage.DOT]: 'Dot',
  [MaturityStage.LINE]: 'Line',
  [MaturityStage.PARAGRAPH]: 'Para',
  [MaturityStage.PAGE]: 'Page',
};

export const MaturityProgress: React.FC<MaturityProgressProps> = ({ 
  currentStage,
  position = 'top' 
}) => {
  const currentIndex = STAGES.indexOf(currentStage);

  return (
    <View style={[styles.container, position === 'top' ? styles.top : styles.bottom]}>
      {STAGES.map((stage, index) => {
        const isCompleted = index <= currentIndex;
        const isActive = index === currentIndex;
        
        return (
          <View key={stage} style={styles.stageWrapper}>
            <View style={[
              styles.segment, 
              isCompleted && styles.completedSegment,
              isActive && styles.activeSegment
            ]} />
            <Text style={[
              styles.label, 
              isCompleted && styles.completedLabel,
              isActive && styles.activeLabel
            ]}>
              {STAGE_LABELS[stage]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#38383A',
  },
  top: {
    paddingTop: 12,
  },
  bottom: {
    borderTopWidth: 1,
    borderBottomWidth: 0,
  },
  stageWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  segment: {
    height: 4,
    width: '90%',
    backgroundColor: '#38383A',
    borderRadius: 2,
    marginBottom: 6,
  },
  completedSegment: {
    backgroundColor: '#0A84FF', // Maturity Blue
  },
  activeSegment: {
    backgroundColor: '#30D158', // Maturity Green for progress? actually stay consistent with badge or just use blue
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#8E8E93',
    textTransform: 'uppercase',
  },
  completedLabel: {
    color: '#FFFFFF',
  },
  activeLabel: {
    color: '#30D158',
  },
});
