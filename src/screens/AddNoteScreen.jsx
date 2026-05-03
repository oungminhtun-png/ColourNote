import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNotes } from '../context/NotesContext';

const COLORS = ['#FFF29C', '#FF8B94', '#D1C4E9', '#B3E5FC', '#C8E6C9', '#FFCCBC', '#B2EBF2', '#D7CCC8', '#CFD8DC'];

const AddNoteScreen = ({ navigation, route }) => {
  const { addNote, updateNote } = useNotes();
  
  // Edit လုပ်ဖို့ data ပါလာသလား စစ်ဆေးခြင်း
  const editNote = route.params?.editNote;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  // Edit Mode ဆိုလျှင် မူလ data များကို နေရာချခြင်း
  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
      setSelectedColor(editNote.color);
    }
  }, [editNote]);

  const handleSave = () => {
    if (title.trim() === '' && content.trim() === '') {
      navigation.goBack();
      return;
    }

    if (editNote) {
      // Note အဟောင်းကို ပြင်ခြင်း
      updateNote(editNote.id, title, content, selectedColor);
    } else {
      // Note အသစ်ထည့်ခြင်း
      addNote(title, content, selectedColor);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{editNote ? 'Edit Note' : 'Add Note'}</Text>
        <TouchableOpacity onPress={handleSave}>
          <Ionicons name="checkmark" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          placeholder="Title"
          placeholderTextColor="#636e72"
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
        />

        <View style={styles.contentBox}>
          <TextInput
            placeholder="Write something..."
            placeholderTextColor="#636e72"
            multiline
            style={styles.contentInput}
            value={content}
            onChangeText={(text) => text.length <= 500 && setContent(text)}
          />
          <Text style={styles.charCount}>{content.length} / 500</Text>
        </View>

        <Text style={styles.sectionLabel}>Choose Color</Text>
        <FlatList
          data={COLORS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.colorCircle, { backgroundColor: item }]}
              onPress={() => setSelectedColor(item)}
            >
              {selectedColor === item && <Ionicons name="checkmark" size={20} color="#333" />}
            </TouchableOpacity>
          )}
          style={styles.colorList}
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.btnText}>{editNote ? 'Update' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121421', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  titleInput: { backgroundColor: '#1e222d', color: 'white', fontSize: 18, borderRadius: 15, padding: 15, marginBottom: 20 },
  contentBox: { backgroundColor: '#1e222d', borderRadius: 15, padding: 15, minHeight: 250, justifyContent: 'space-between' },
  contentInput: { color: 'white', fontSize: 16, textAlignVertical: 'top', flex: 1 },
  charCount: { color: '#636e72', textAlign: 'right', fontSize: 12, marginTop: 10 },
  sectionLabel: { color: 'white', fontSize: 16, marginTop: 25, marginBottom: 15 },
  colorList: { marginBottom: 30 },
  colorCircle: { width: 45, height: 45, borderRadius: 22.5, marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  cancelBtn: { flex: 1, backgroundColor: '#2d3436', padding: 15, borderRadius: 25, alignItems: 'center', marginRight: 10 },
  saveBtn: { flex: 1, backgroundColor: '#6C5CE7', padding: 15, borderRadius: 25, alignItems: 'center', marginLeft: 10 },
  btnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default AddNoteScreen;