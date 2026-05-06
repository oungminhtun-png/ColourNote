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
import CustomButton from '../components/CustomButton';

const HomeScreen = ({ navigation }) => {
  // Context မှ function များဆွဲထုတ်ခြင်း
  const { notes, deleteNote, toggleFavorite, togglePin, duplicateNote } = useNotes();
  
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const openMenu = (note, event) => {
    const { pageX, pageY } = event.nativeEvent;
    // Menu ပေါ်မည့်နေရာကို ညှိခြင်း
    setMenuPosition({ x: pageX - 160, y: pageY + 10 });
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
      onLongPress={(e) => openMenu(item, e)}
      activeOpacity={0.9}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title || "No Title"}
        </Text>
        
        <View style={styles.statusIcons}>
          {/* Pin & Favorite Icons */}
          {item.isPinned && (
            <Ionicons name="pin" size={14} color="#333" style={styles.iconSpacing} />
          )}
          {item.isFavorite && (
            <Ionicons name="star" size={14} color="#333" style={styles.iconSpacing} />
          )}
          
          <TouchableOpacity
            onPress={(e) => openMenu(item, e)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.iconSpacing}
          >
            <Ionicons name="ellipsis-vertical" size={18} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.cardContent} numberOfLines={6}>
        {item.content}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.dateBox}>
          <Ionicons name="time-outline" size={12} color="#555" />
          <Text style={styles.cardDate}>{item.date || "Just now"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Pin လုပ်ထားသော Note များကို ထိပ်ဆုံးသို့ပို့ရန် Sort လုပ်ခြင်း
  const sortedNotes = [...notes].sort((a, b) => 
    (b.isPinned === a.isPinned ? 0 : b.isPinned ? 1 : -1)
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Title ကို အလယ်တွင်ထားခြင်း */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
      </View>

      <FlatList
        data={sortedNotes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Custom Context Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <View style={[styles.menuContainer, { top: menuPosition.y, left: menuPosition.x }]}>
              
              <MenuItem 
                icon={selectedNote?.isPinned ? "pin" : "pin-outline"} 
                text={selectedNote?.isPinned ? "Unpin Note" : "Pin Note"}
color="#ffeaa7" 
                onPress={() => { togglePin(selectedNote.id); closeMenu(); }} 
              />
              
              <MenuItem 
                icon={selectedNote?.isFavorite ? "star" : "star-outline"} 
                text={selectedNote?.isFavorite ? "Remove Favorite" : "Add Favorite"} 
                color="#fab1a0" 
                onPress={() => { toggleFavorite(selectedNote.id); closeMenu(); }} 
              />
              
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

      <CustomButton onPress={() => navigation.navigate('AddNote')} />
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
  header: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    width: '100%' 
  },
  headerTitle: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: 'white', 
    textAlign: 'center' 
  },
  listContainer: { padding: 10 },
  card: { 
    flex: 1, 
    margin: 8, 
    padding: 15, 
    borderRadius: 22, 
    minHeight: 170, 
    justifyContent: 'space-between',
    elevation: 4
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#121421', flex: 1, marginRight: 5 },
  statusIcons: { flexDirection: 'row', alignItems: 'center' },
  iconSpacing: { marginLeft: 6 },
  cardContent: { fontSize: 13, color: '#444', marginTop: 8, lineHeight: 18 },
  cardFooter: { marginTop: 12 },
  dateBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.05)', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 10 
  },
  cardDate: { fontSize: 10, color: '#555', marginLeft: 4 },

  modalOverlay: { flex: 1, backgroundColor: 'transparent' },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#1E212D',
    width: 170,
    borderRadius: 15,
    padding: 8,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8 },
  menuText: { color: 'white', fontSize: 14, marginLeft: 12 },
  divider: { height: 1, backgroundColor: '#2d3436', marginVertical: 4, marginHorizontal: 8 }
});

export default HomeScreen;