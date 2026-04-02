import React from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  Text, 
  SafeAreaView 
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useIdeaStore } from '../../../src/features/idea/globalState';
import { SpecField } from '../../../src/features/idea/components/SpecField';
import { SparkOrigin } from '../../../src/features/idea/components/SparkOrigin';
import { ShareButton } from '../../../src/features/idea/components/ShareButton';
import { MaturityBadge } from '../../../src/features/idea/components/MaturityBadge';
import { Idea } from '../../../src/features/idea/types';

const SPEC_FIELDS = [
  { key: 'problem', label: 'Problem' },
  { key: 'audience', label: 'Audience' },
  { key: 'solution', label: 'Solution' },
  { key: 'successMetrics', label: 'Success Metrics' },
  { key: 'effortEstimate', label: 'Effort Estimate' },
  { key: 'uniqueness', label: 'Uniqueness' },
] as const;

export default function SpecCardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ideas } = useIdeaStore();

  const idea = ideas.find((i: Idea) => i.id === id);

  if (!idea) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: idea.title + ' Spec' }} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <MaturityBadge stage={idea.maturity} />
          <Text style={styles.date}>Updated {new Date(idea.updatedAt).toLocaleDateString()}</Text>
        </View>

        <SparkOrigin spark={idea.spark} />

        <View style={styles.specBody}>
          {SPEC_FIELDS.map((field) => (
            <SpecField 
              key={field.key} 
              label={field.label} 
              value={(idea.spec as any)?.[field.key] || null} 
            />
          ))}
        </View>

        <ShareButton idea={idea} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    color: '#8E8E93',
    fontSize: 12,
  },
  specBody: {
    paddingTop: 12,
  },
});
