import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotes } from '../context/NotesContext';

const FavouritesScreen = ({ navigation }) => {
  const { notes } = useNotes();
  
  // Favourite ဖြစ်တဲ့ Note တွေကိုပဲ စစ်ထုတ်ယူခြင်း
  const favouriteNotes = notes.filter(note => note.isFavorite);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: item.color || '#FEF38C' }]}
      // Home ကလိုပဲ နှိပ်လိုက်ရင် AddNote (Edit mode) ကို သွားဖို့
      onPress={() => navigation.navigate('AddNote', { editNote: item })}
    >
      <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.cardContent} numberOfLines={3}>{item.content}</Text>
      
      {item.date && (
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>🕒 {item.date}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourites</Text>
      </View>

      <FlatList
        data={favouriteNotes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Card နှစ်ခုစီပြချင်ရင် သုံးနိုင်ပါတယ်
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favourite notes yet!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121421' },
  header: { padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  listContainer: { padding: 10 },
  card: {
    flex: 1,
    margin: 8,
    padding: 15,
    borderRadius: 20,
    minHeight: 120,
    // Android Shadow
    elevation: 5,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#121421' },
  cardContent: { fontSize: 14, color: '#444', marginTop: 8 },
  dateBadge: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 10
  },
  dateText: { fontSize: 10, color: '#636e72' },
  emptyContainer: { marginTop: 100, alignItems: 'center' },
  emptyText: { color: '#636e72', fontSize: 16 }
});

export default FavouritesScreen;