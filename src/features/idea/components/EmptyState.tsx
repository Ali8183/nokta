import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface EmptyStateProps {
  message?: string;
  showAnimation?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "Start with a dot.", 
  showAnimation = true 
}) => {
  const pulseAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    if (showAnimation) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.7,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [showAnimation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.dot, 
        { transform: [{ scale: showAnimation ? pulseAnim : 1 }] }
      ]} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 100,
  },
  dot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8E8E93', // MaturityStage.DOT color
    marginBottom: 24,
    shadowColor: '#8E8E93',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  message: {
    fontSize: 20,
    fontWeight: '300',
    color: '#8E8E93',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
