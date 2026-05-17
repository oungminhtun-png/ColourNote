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

const HomeScreen = ({ navigation }) => {
  const { notes, deleteNote, toggleFavorite, duplicateNote } = useNotes();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 20 });

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
        {/* 🌟 Title မှာ user ရွေးချယ်ထားတဲ့ စာလုံးအရောင် ပြောင်းလဲနိုင်ရန် style ထည့်သွင်းထားပါသည် */}
        <Text 
          style={[styles.cardTitle, { color: item.textColor || '#121421' }]} 
          numberOfLines={1}
        >
          {item.title}
        </Text>

        {/* Heart နှင့် Menu Button များ */}
        <View style={styles.statusIcons}>
          <TouchableOpacity
            onPress={() => toggleFavorite(item.id)}
            style={styles.iconBtn}
          >
            <Ionicons
              name={item.isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={item.isFavorite ? "#ff4757" : (item.textColor || "#121421")} // 🌟 Icon အရောင်ပါ လိုက်ပြောင်းပေးပါသည်
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={(event) => openMenu(event, item)}
            style={styles.iconBtn}
          >
            {/* 🌟 Menu Icon ကိုလည်း Note Text Color အတိုင်း လိုက်ညှိပေးထားပါသည် */}
            <Ionicons name="ellipsis-vertical" size={20} color={item.textColor || "#121421"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 🌟 Content မှာလည်း user ရွေးချယ်ထားတဲ့ စာလုံးအရောင် ပြောင်းလဲနိုင်ရန် style ထည့်သွင်းထားပါသည် */}
      <Text 
        style={[styles.cardContent, { color: item.textColor ? item.textColor + 'CC' : '#444444' }]} // 'CC' ထည့်ခြင်းက စာသားကို 80% opacity ဖြစ်စေပြီး ပိုမိုလှပစေပါတယ်
        numberOfLines={4}
      >
        {item.content}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.dateBox}>
          {/* 🌟 Time Icon နှင့် Date စာသားကိုလည်း လိုက်ဖက်အောင် အရောင်ညှိထားပါသည် */}
          <Ionicons name="time-outline" size={12} color={item.textColor || "#555555"} />
          <Text style={[styles.cardDate, { color: item.textColor || "#444444" }]}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
      </View>

      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notes yet. Tap + to start!</Text>
          </View>
        }
      />

      {/* Options Menu Modal */}
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

      {/* Add Note Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddNote')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
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
  listContainer: { paddingHorizontal: 15, paddingBottom: 100 },

  // Card Styles
  card: {
    marginBottom: 15,
    padding: 18,
    borderRadius: 25,
    minHeight: 150,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  statusIcons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { padding: 5, marginLeft: 5 },
  cardContent: { fontSize: 14, marginTop: 10, lineHeight: 20 },
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
  cardDate: { fontSize: 11, marginLeft: 5 },

  // FAB Style
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    backgroundColor: '#6C5CE7',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  // Modal Styles
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
  emptyText: { color: '#636e72' }
});

export default HomeScreen;