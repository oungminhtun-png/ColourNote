import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNotes } from '../context/NotesContext';
import CustomButton from '../components/CustomButton';

const HomeScreen = ({ navigation }) => {
  const { notes, deleteNote } = useNotes();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Menu ကို Three Dots နားမှာ ပေါ်အောင် Position တွက်ချက်ခြင်း
  const openMenu = (note, event) => {
    const { pageX, pageY } = event.nativeEvent;
    // Screen ညာဘက်အစွန်းရောက်နေရင် Menu ကို ဘယ်ဘက်ကို နည်းနည်းတိုးပြရန်
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
      onPress={() => navigation.navigate('AddNote', { editNote: item })} // Card ကို နှိပ်ရင် Edit Screen သို့သွားမည်
      onLongPress={(e) => openMenu(item, e)}
      activeOpacity={0.9}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title || "No Title"}</Text>
        <TouchableOpacity
          onPress={(e) => openMenu(item, e)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // နှိပ်ရတာ ပိုလွယ်အောင် Area ချဲ့ထားခြင်း
        >
          <Ionicons name="ellipsis-vertical" size={18} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.cardContent} numberOfLines={6}>{item.content}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.dateBox}>
          <Ionicons name="time-outline" size={12} color="#555" />
          <Text style={styles.cardDate}>{item.date || "Just now"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="reorder-two-outline" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Notes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* --- Custom Context Menu --- */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <View style={[styles.menuContainer, { top: menuPosition.y, left: menuPosition.x }]}>
              <MenuItem icon="pin-outline" text="Pin Note" color="#ffeaa7" onPress={closeMenu} />
              <MenuItem icon="star-outline" text="Add Favorite" color="#fab1a0" onPress={closeMenu} />
              <MenuItem icon="copy-outline" text="Duplicate" color="#55efc4" onPress={closeMenu} />
              <MenuItem icon="share-social-outline" text="Share" color="#a29bfe" onPress={() => { Share.share({ message: selectedNote.content }); closeMenu(); }} />
              <View style={styles.divider} />
              <MenuItem icon="trash-outline" text="Delete" color="#ff7675" onPress={() => { deleteNote(selectedNote.id); closeMenu(); }} />
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: 'white' },
  listContainer: { padding: 10 },
  card: { flex: 1, margin: 8, padding: 15, borderRadius: 22, minHeight: 170, justifyContent: 'space-between' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#121421', flex: 1, marginRight: 5 },
  cardContent: { fontSize: 13, color: '#444', marginTop: 8, lineHeight: 18 },
  cardFooter: { marginTop: 12 },
  dateBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.05)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  cardDate: { fontSize: 10, color: '#555', marginLeft: 4 },

  // Modal & Popup Menu Styles
  modalOverlay: { flex: 1, backgroundColor: 'transparent' },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#1E212D',
    width: 160,
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