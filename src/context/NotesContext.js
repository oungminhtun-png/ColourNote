import React, { createContext, useState, useEffect, useContext } from 'react';
// သွင်းလိုက်တဲ့ Package အသစ်ကို ဒီကနေ ခေါ်သုံးရပါမယ်
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // App စဖွင့်လိုက်တိုင်း ဖုန်းထဲမှာ သိမ်းထားတဲ့ Note တွေကို ပြန်ဖတ်မယ်
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('@notes_list');
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (e) {
      console.error('Error reading notes from storage:', e);
    }
  };

  // Data ပြောင်းလဲမှုရှိတိုင်း ဖုန်းထဲမှာ အမြဲတမ်း သိမ်းပေးမယ့် Function
  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem('@notes_list', JSON.stringify(newNotes));
    } catch (e) {
      console.error('Error saving notes to storage:', e);
    }
  };

  // Note အသစ်ထည့်ခြင်း
  const addNote = (newNote) => {
    const noteWithId = { 
      id: Date.now(), 
      ...newNote, 
      isFavorite: false, 
      isPinned: false 
    };
    const updatedNotes = [noteWithId, ...notes];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  // Note ဖျက်ခြင်း
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  // Note ပြင်ခြင်း
  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  // Favorite (Love icon) ပြောင်းလဲခြင်း
  const toggleFavorite = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  // Pin လုပ်ခြင်း
  const togglePin = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  // Note တစ်ခုကို ပွားခြင်း (Duplicate)
  const duplicateNote = (note) => {
    const newNote = {
      ...note,
      id: Date.now(),
      title: `${note.title} (Copy)`,
      date: new Date().toLocaleDateString(),
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        updateNote,
        toggleFavorite,
        togglePin,
        duplicateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);