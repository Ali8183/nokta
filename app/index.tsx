import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text, 
  Alert, 
  Modal, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useIdeaStore } from '../src/features/idea/store';
import { IdeaCard } from '../src/features/idea/components/IdeaCard';
import { EmptyState } from '../src/features/idea/components/EmptyState';
import { FAB } from '../src/features/idea/components/FAB';
import { MaturityStage, Idea } from '../src/features/idea/types';

export default function IdeaListScreen() {
  const router = useRouter();
  const { ideas, loadIdeas, addIdea, deleteIdea } = useIdeaStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [spark, setSpark] = useState('');

  useEffect(() => {
    loadIdeas();
  }, [loadIdeas]);

  const handleCreateIdea = async () => {
    if (!spark.trim()) return;

    const newIdea: Idea = {
      id: Math.random().toString(36).substring(2, 11), // Simple UUID replacement
      title: spark.length > 20 ? spark.substring(0, 17) + '...' : spark,
      spark: spark.trim(),
      maturity: MaturityStage.DOT,
      messages: [],
      spec: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addIdea(newIdea);
    setSpark('');
    setModalVisible(false);
    
    // Auto-navigate to chat (as requested in program.md § 5)
    router.push(`/idea/${newIdea.id}`);
  };

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      'Delete Idea',
      `Are you sure you want to delete "${title || 'this idea'}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteIdea(id) },
      ]
    );
  };

  const sortedIdeas = [...ideas].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Nokta', headerTransparent: true, headerTintColor: '#fff' }} />
      <StatusBar style="light" />

      {ideas.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={sortedIdeas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <IdeaCard 
              idea={item} 
              onPress={(id) => router.push(`/idea/${id}`)}
              onLongPress={(id) => handleDelete(id, item.title)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <FAB onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Spark</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.input}
              placeholder="What's your idea?"
              placeholderTextColor="#8E8E93"
              value={spark}
              onChangeText={setSpark}
              multiline
              autoFocus
            />
            
            <TouchableOpacity 
              style={[styles.sendButton, !spark.trim() && styles.disabledButton]}
              onPress={handleCreateIdea}
              disabled={!spark.trim()}
            >
              <Text style={styles.sendButtonText}>Ignite</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // True Black
    paddingHorizontal: 16,
  },
  listContent: {
    paddingTop: 100, // Account for header
    paddingBottom: 100, // Account for FAB
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    color: '#007AFF',
    fontSize: 16,
  },
  input: {
    fontSize: 18,
    color: '#FFFFFF',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
