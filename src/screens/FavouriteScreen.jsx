import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotes } from '../context/NotesContext';
// HomeScreen မှာ သုံးထားတဲ့ renderItem logic ကို ပြန်သုံးလို့ရအောင် item component အနေနဲ့ ခွဲရေးထားရင် ပိုကောင်းပါတယ်
// အခုလောလောဆယ်တော့ ရိုးရိုးပဲ ရေးပြထားပါမယ်

const FavouriteScreen = () => {
  const { notes } = useNotes();

  // Favorite လုပ်ထားတာတွေကိုပဲ Filter လုပ်ယူခြင်း
  const favouriteNotes = notes.filter(note => note.isFavorite);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourites</Text>
      </View>

      {favouriteNotes.length > 0 ? (
        <FlatList
          data={favouriteNotes}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            // HomeScreen က renderItem logic အတိုင်း ဒီမှာလည်း ပြန်သုံးပေးပါ
            <View style={[styles.card, { backgroundColor: item.color }]}>
               <Text style={styles.cardTitle}>{item.title}</Text>
               <Text numberOfLines={4} style={styles.cardContent}>{item.content}</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favourite notes yet!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121421' },
  header: { padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  listContainer: { padding: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#636e72', fontSize: 16 },
  card: { flex: 1, margin: 8, padding: 15, borderRadius: 20, minHeight: 150 },
  cardTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  cardContent: { fontSize: 13, color: '#333' }
});

export default FavouriteScreen;