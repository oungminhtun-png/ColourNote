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
  
  const [selectedColor, setSelectedColor] = useState('#FEF38C'); 
  const [textColor, setTextColor] = useState('#000000'); 
  const [colorMode, setColorMode] = useState('bg');

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
      setSelectedColor(editNote.color || '#FEF38C');
      setTextColor(editNote.textColor || '#000000');
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
      textColor: textColor,
      date: new Date().toLocaleDateString(),
      isFavorite: editNote ? editNote.isFavorite : false,
      isPinned: editNote ? editNote.isPinned : false,
    };

    if (editNote) {
      updateNote({ id: editNote.id, ...noteData });
    } else {
      addNote(noteData);
    }
    navigation.goBack();
  };

  const onColorChange = (color) => {
    if (colorMode === 'bg') {
      setSelectedColor(color);
    } else {
      setTextColor(color);
    }
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
            style={[styles.titleInput, { backgroundColor: selectedColor, color: textColor }]}
            placeholder="Title"
            placeholderTextColor={colorMode === 'text' ? textColor + '80' : '#636e72'}
            value={title}
            onChangeText={setTitle}
          />

          {/* Content Input Box */}
          <View style={[styles.contentBox, { backgroundColor: selectedColor }]}>
            <TextInput
              style={[styles.contentInput, { color: textColor }]}
              placeholder="Write something..."
              placeholderTextColor={colorMode === 'text' ? textColor + '80' : '#636e72'}
              multiline
              value={content}
              onChangeText={setContent}
            />
          </View>

          {/* Tab Container */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tabButton, colorMode === 'bg' && styles.activeTab]} 
              onPress={() => setColorMode('bg')}
            >
              <Ionicons name="contrast-outline" size={18} color={colorMode === 'bg' ? 'white' : '#636e72'} />
              <Text style={[styles.tabText, colorMode === 'bg' && styles.activeTabText]}>Note Color</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabButton, colorMode === 'text' && styles.activeTab]} 
              onPress={() => setColorMode('text')}
            >
              <Ionicons name="text-outline" size={18} color={colorMode === 'text' ? 'white' : '#636e72'} />
              <Text style={[styles.tabText, colorMode === 'text' && styles.activeTabText]}>Text Color</Text>
            </TouchableOpacity>
          </View>

          {/* Color Picker Section (နေရာလွတ်နှင့် Layout သေချာပြင်ဆင်ထားသည်) */}
          <View style={styles.pickerContainer}>
            <View style={styles.wheelWrapper}>
              <ColorPicker
                color={colorMode === 'bg' ? selectedColor : textColor}
                onColorChangeComplete={onColorChange}
                thumbSize={24}
                sliderSize={20}
                noSnap={true}
                row={false}
                swatches={false} // 🌟 ပြဿနာဖြစ်စေတဲ့ Library ရဲ့ Default အောက်ခြေအရောင်ကွက်တွေကို ပိတ်လိုက်တာပါဗျာ
              />
            </View>

            {/* 🌟 ဒါကတော့ ကျွန်တော်တို့ သီးသန့်လုပ်ထားတဲ့ Quick Select အဖြူ၊ အမဲ ခလုတ်တန်းပါ */}
            <View style={styles.shortcutContainer}>
              <Text style={styles.shortcutLabel}>Quick Select:</Text>
              <View style={styles.swatchRow}>
                {/* အဖြူရောင် ဝိုင်းလေး */}
                <TouchableOpacity 
                  style={[styles.colorSwatch, { backgroundColor: '#FFFFFF' }]} 
                  onPress={() => onColorChange('#FFFFFF')}
                />
                {/* အမဲရောင် ဝိုင်းလေး */}
                <TouchableOpacity 
                  style={[styles.colorSwatch, { backgroundColor: '#000000', borderColor: '#555' }]} 
                  onPress={() => onColorChange('#000000')}
                />
              </View>
            </View>
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
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
    fontSize: 18,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  contentBox: {
    borderRadius: 15,
    padding: 15,
    minHeight: 250,
    justifyContent: 'space-between'
  },
  contentInput: {
    fontSize: 16,
    textAlignVertical: 'top',
    flex: 1
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e222d',
    borderRadius: 15,
    padding: 5,
    marginTop: 25,
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#6C5CE7',
  },
  tabText: {
    color: '#636e72',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  // Picker Box တစ်ခုလုံးစာ
  pickerContainer: {
    backgroundColor: '#1e222d',
    borderRadius: 25,
    padding: 20,
    marginBottom: 35,
  },
  // Wheel အဝိုင်းနဲ့ slider တန်းအတွက် ကွက်တိနေရာလွတ်
  wheelWrapper: {
    width: '100%',
    height: 250, // 🌟 အောက်ခြေမညှပ်အောင် အမြင့်ကို ပိုတိုးပေးထားပါတယ်ဗျာ
    justifyContent: 'center',
    marginBottom: 10,
  },
  // Quick Select တန်း
  shortcutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#2d3436',
    paddingTop: 15,
    marginTop: 10,
  },
  shortcutLabel: {
    color: '#636e72',
    fontSize: 14,
    fontWeight: '500'
  },
  swatchRow: {
    flexDirection: 'row',
    gap: 15,
  },
  colorSwatch: {
    width: 35, // 🌟 ခလုတ်လေးတွေကို ပိုနှိပ်လို့ကောင်းအောင် အရွယ်အစား အနည်းငယ်ကြီးပေးထားပါတယ်
    height: 35,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: '#343a40',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
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