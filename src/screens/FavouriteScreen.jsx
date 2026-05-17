import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNotes } from '../context/NotesContext';

const FavouritesScreen = ({ navigation }) => {
  const { notes, deleteNote, toggleFavorite, duplicateNote } = useNotes();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 20 });

  // Favourite ဖြစ်ထားတဲ့ Note တွေကိုပဲ စစ်ထုတ်ယူခြင်း
  const favouriteNotes = notes.filter(note => note.isFavorite);

  const openMenu = (event, note) => {
    const { py } = event.nativeEvent;
    setMenuPosition({ top: py + 20, right: 20 });
    setSelectedNote(note);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedNote(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color || '#FEF38C' }]}
      onPress={() => navigation.navigate('AddNote', { editNote: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        
        <View style={styles.statusIcons}>
          {/* Love Button - Favourite ဖြစ်ပြီးသားမို့ အမြဲ အနီရောင်ဖြစ်နေမယ် */}
          <TouchableOpacity 
            onPress={() => toggleFavorite(item.id)}
            style={styles.iconBtn}
          >
            <Ionicons 
              name="heart" 
              size={22} 
              color="#ff4757" 
            />
          </TouchableOpacity>

          {/* Three Dots Menu */}
          <TouchableOpacity 
            onPress={(event) => openMenu(event, item)}
            style={styles.iconBtn}
          >
            <Ionicons name="ellipsis-vertical" size={20} color="#121421" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.cardContent} numberOfLines={4}>{item.content}</Text>
      
      <View style={styles.cardFooter}>
        <View style={styles.dateBox}>
          <Ionicons name="time-outline" size={12} color="#555" />
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
      </View>
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
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={50} color="#636e72" />
            <Text style={styles.emptyText}>No favourite notes yet!</Text>
          </View>
        }
      />

      {/* Options Menu Modal (Home ကအတိုင်း) */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <View style={[styles.menuContainer, { top: menuPosition.top, right: menuPosition.right }]}>
              <MenuItem
                icon="copy-outline"
                text="Duplicate"
                color="#55efc4"
                onPress={() => { duplicateNote(selectedNote); closeMenu(); }}
              />
              <MenuItem
                icon="share-social-outline"
                text="Share"
                color="#a29bfe"
                onPress={() => {
                  Share.share({
                    title: selectedNote?.title,
                    message: `${selectedNote?.title}\n\n${selectedNote?.content}`
                  });
                  closeMenu();
                }}
              />
              <View style={styles.divider} />
              <MenuItem
                icon="trash-outline"
                text="Delete"
                color="#ff7675"
                onPress={() => { deleteNote(selectedNote.id); closeMenu(); }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, text, color, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={18} color={color} />
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121421' },
  header: { padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  listContainer: { paddingHorizontal: 15, paddingBottom: 30 },
  card: {
    marginBottom: 15,
    padding: 18,
    borderRadius: 25,
    minHeight: 150,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#121421', flex: 1 },
  statusIcons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { padding: 5, marginLeft: 5 },
  cardContent: { fontSize: 14, color: '#444', marginTop: 10, lineHeight: 20 },
  cardFooter: { marginTop: 15 },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardDate: { fontSize: 11, color: '#444', marginLeft: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'transparent' },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#1E212D',
    width: 160,
    borderRadius: 15,
    padding: 8,
    elevation: 20,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10 },
  menuText: { color: 'white', fontSize: 14, marginLeft: 12 },
  divider: { height: 1, backgroundColor: '#2d3436', marginVertical: 4 },
  emptyContainer: { marginTop: 100, alignItems: 'center' },
  emptyText: { color: '#636e72', marginTop: 10 }
});

export default FavouritesScreen;