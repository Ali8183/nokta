import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Share, Alert } from 'react-native';
import { Idea } from '../types';

interface ShareButtonProps {
  idea: Idea;
  format?: 'markdown' | 'text';
}

export const ShareButton: React.FC<ShareButtonProps> = ({ idea, format = 'markdown' }) => {
  const generateMarkdown = () => {
    const spec = idea.spec;
    if (!spec) return `Idea: ${idea.title}\n\nSpark: ${idea.spark}`;

    return `# ${idea.title}
    
## Origin
> ${idea.spark}

## Problem
${spec.problem}

## Target Audience
${spec.audience}

## Proposed Solution
${spec.solution}

## Success Metrics
${spec.successMetrics}

## Effort Estimate
**${spec.effortEstimate}**

## Key Differentiator
${spec.uniqueness}

Generated with Nokta 📄`;
  };

  const handleShare = async () => {
    const content = generateMarkdown();
    try {
      const result = await Share.share({
        message: content,
        title: idea.title,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert('Share Failed', error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleShare}>
      <Text style={styles.text}>Export as {format.toUpperCase()} 📤</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    backgroundColor: '#007AFF', // Standard Blue
    marginVertical: 40,
    alignSelf: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});
