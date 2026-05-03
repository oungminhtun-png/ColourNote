import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // ပိတ်ထားပြီးသား

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // --- ၁။ App စဖွင့်ချိန်မှာ ဖုန်းထဲက Note တွေကို ပြန်ယူခြင်း ---
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      // AsyncStorage မရှိသေးတဲ့အတွက် ဒီအတိုင်း ခဏပိတ်ထားပါ
      /* const savedNotes = await AsyncStorage.getItem('@my_notes');
      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      } 
      */
      console.log('AsyncStorage disabled for now');
    } catch (e) {
      console.log('Failed to load notes.', e);
    }
  };

  // --- ၂။ Note တွေ ပြောင်းလဲတိုင်း ဖုန်းထဲမှာ အလိုအလျောက် သိမ်းခြင်း ---
  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  const saveNotesToStorage = async (currentNotes) => {
    try {
      // AsyncStorage မရှိသေးတဲ့အတွက် ဒီအတိုင်း ခဏပိတ်ထားပါ
      // await AsyncStorage.setItem('@my_notes', JSON.stringify(currentNotes));
    } catch (e) {
      console.log('Failed to save notes.', e);
    }
  };

  // Note အသစ်ထည့်ခြင်း
  const addNote = (note) => {
    const newNote = { id: Date.now(), ...note };
    setNotes([newNote, ...notes]);
  };

  // Note ဖြုတ်ခြင်း
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Note ပြင်ခြင်း
  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);