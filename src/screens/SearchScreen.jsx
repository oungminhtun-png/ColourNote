import { View, TextInput, StyleSheet } from 'react-native';
export default function SearchScreen() {
  return (
    <View style={{flex:1, backgroundColor:'#121421', padding: 20}}>
       <TextInput placeholder="Search notes..." placeholderTextColor="gray" style={{borderBottomWidth:1, borderColor:'gray', color:'white'}} autoFocus />
    </View>
  );
}