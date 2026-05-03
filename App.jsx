import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context & Navigation - လမ်းကြောင်းများကို စစ်ဆေးပါ
import { NotesProvider } from './src/context/NotesContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

// Other Screens
import AddNoteScreen from './src/screens/AddNoteScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NotesProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* MainTabs နေရာမှာ ခွဲထုတ်ထားတဲ့ BottomTabNavigator ကို သုံးပါမယ် */}
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          
          {/* Modal ပုံစံ ပေါ်ချင်တဲ့ Screen များ */}
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen 
            name="AddNote" 
            component={AddNoteScreen} 
            options={{ 
              presentation: 'modal', 
              animation: 'slide_from_bottom' 
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
}