import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNotes } from '../context/NotesContext';

const SearchScreen = ({ navigation }) => {
  const { notes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Search Logic: စာရိုက်လိုက်တိုင်း Note တွေကို စစ်ထုတ်ပေးခြင်း
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNotes([]);
    } else {
      const results = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(results);
    }
  }, [searchQuery, notes]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color || '#FEF38C' }]}
      onPress={() => navigation.navigate('AddNote', { editNote: item })}
    >
      <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.cardContent} numberOfLines={3}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header Area */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#636e72" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search notes..."
            placeholderTextColor="#636e72"
            autoFocus={true} // Screen ပွင့်တာနဲ့ Keyboard တန်းပွင့်ရန်
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#636e72" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results */}
      {searchQuery.trim() !== '' ? (
        <FlatList
          data={filteredNotes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No notes found matching "{searchQuery}"</Text>
          }
        />
      ) : (
        <View style={styles.initialState}>
          <Ionicons name="search" size={80} color="#1e222d" />
          <Text style={styles.initialText}>Find your notes by title or content</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121421' },
  searchHeader: { padding: 15 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e222d',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  listContainer: { padding: 10 },
  card: {
    flex: 1,
    margin: 8,
    padding: 15,
    borderRadius: 15,
    minHeight: 120,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#121421' },
  cardContent: { fontSize: 13, color: '#444', marginTop: 5 },
  emptyText: { color: '#636e72', textAlign: 'center', marginTop: 50 },
  initialState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  initialText: { color: '#636e72', marginTop: 15, fontSize: 14 },
});

export default SearchScreen;