import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ColorPicker from 'react-native-wheel-color-picker';
import { useNotes } from '../context/NotesContext';

const AddNoteScreen = ({ navigation, route }) => {
  const { addNote, updateNote } = useNotes();
  const editNote = route.params?.editNote;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FEF38C'); // Default color

  // Edit Mode အတွက် data ပြန်ဖြည့်ခြင်း
  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
      setSelectedColor(editNote.color || '#FEF38C');
    }
  }, [editNote]);

  const handleSave = () => {
    if (title.trim() === '' && content.trim() === '') {
      navigation.goBack();
      return;
    }

    const noteData = {
      title,
      content,
      color: selectedColor,
      date: new Date().toLocaleDateString(),
      // 🌟 ဒီအပိုင်းက အသက်ပါပဲဗျာ - editNote ရှိရင် မူလ Status အမှန်ကို သိမ်းထားမယ်၊ မရှိရင် false ပေးမယ်
      isFavorite: editNote ? editNote.isFavorite : false,
      isPinned: editNote ? editNote.isPinned : false,
    };

    if (editNote) {
      // Edit လုပ်တာဖြစ်လို့ id ရော status တွေပါ တစ်ခါတည်း update လုပ်မယ်
      updateNote({ id: editNote.id, ...noteData });
    } else {
      addNote(noteData);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close-outline" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {editNote ? 'Edit Note' : 'Add Note'}
            </Text>
            <TouchableOpacity onPress={handleSave}>
              <Ionicons name="checkmark-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>

          {/* Title Input */}
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            placeholderTextColor="#636e72"
            value={title}
            onChangeText={setTitle}
          />

          {/* Content Input Box */}
          <View style={styles.contentBox}>
            <TextInput
              style={styles.contentInput}
              placeholder="Write something..."
              placeholderTextColor="#636e72"
              multiline
              value={content}
              onChangeText={setContent}
            />
          </View>

          {/* Color Wheel Section */}
          <Text style={styles.sectionLabel}>Choose Color</Text>
          <View style={styles.pickerContainer}>
            <ColorPicker
              color={selectedColor}
              onColorChangeComplete={(color) => setSelectedColor(color)}
              thumbSize={25}
              sliderSize={25}
              noSnap={true}
              row={false}
            />
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121421',
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleInput: {
    backgroundColor: '#1e222d',
    color: 'white',
    fontSize: 18,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20
  },
  contentBox: {
    backgroundColor: '#1e222d',
    borderRadius: 15,
    padding: 15,
    minHeight: 250,
    justifyContent: 'space-between'
  },
  contentInput: {
    color: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
    flex: 1
  },
  sectionLabel: {
    color: 'white',
    fontSize: 16,
    marginTop: 25,
    marginBottom: 15
  },
  pickerContainer: {
    height: 280,
    marginBottom: 40,
    backgroundColor: '#1e222d',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#2d3436',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginRight: 10
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#6C5CE7',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginLeft: 10
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default AddNoteScreen;