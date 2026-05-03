import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomButton = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.fab} 
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Ionicons name="add" size={35} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6C5CE7', // ခရမ်းရောင် (ဒီဇိုင်းထဲကအတိုင်း)
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow ပေးခြင်း (iOS & Android)
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default CustomButton;