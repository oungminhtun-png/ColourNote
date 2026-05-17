import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ navigation }) => {

  // သင့် App ရဲ့ Play Store က Package Name (Application ID)
  const appId = 'com.dynamixwave.colornote'; 

  // App ကို Share လုပ်ရန် Function
  const onShare = async () => {
    try {
      await Share.share({
        message: `Download ColorNote App and organize your thoughts! https://play.google.com/store/apps/details?id=${appId}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Rate Us ပေးရန်အတွက် Play Store App သို့ တိုက်ရိုက်သွားမည့် Function
  const handleRateUs = () => {
    const playStoreUrl = `market://details?id=${appId}`;
    const webUrl = `https://play.google.com/store/apps/details?id=${appId}`;

    Linking.canOpenURL(playStoreUrl)
      ? Linking.openURL(playStoreUrl)
      : Linking.openURL(webUrl);
  };

  // Check for Update အတွက် User ကို Play Store က App Page ဆီ တိုက်ရိုက်ပို့ပေးမည့် Function
  const handleCheckUpdate = () => {
    const playStoreUrl = `market://details?id=${appId}`;
    const webUrl = `https://play.google.com/store/apps/details?id=${appId}`;

    Linking.canOpenURL(playStoreUrl)
      ? Linking.openURL(playStoreUrl)
      : Linking.openURL(webUrl);
  };

  // အထွေထွေ Link များဖွင့်ရန် Function
  const handleLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("An error occurred", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Menu Items */}
        <View style={styles.menuGroup}>
          
          {/* About App */}
          <SettingItem 
            icon="information-circle-outline" 
            title="About ColorNote" 
            onPress={() => navigation.navigate('About')} 
          />

          {/* Share App */}
          <SettingItem 
            icon="share-social-outline" 
            title="Share App" 
            onPress={onShare} 
          />

          {/* Rate Us */}
          <SettingItem 
            icon="star-outline" 
            title="Rate Us" 
            onPress={handleRateUs} 
          />

          {/* More Apps */}
          <SettingItem 
            icon="grid-outline" 
            title="More Apps" 
            onPress={() => handleLink('https://play.google.com/store/apps/developer?id=YourID')} 
          />

          {/* 🌟 Telegram Contact - Telegram အစား သေချာပေါက်ရှိမည့် paper-plane-outline သို့ ပြောင်းလဲထားသည် */}
          <SettingItem 
            icon="paper-plane-outline" 
            title="Telegram Contact" 
            iconColor="#26A5E4" // Telegram Official Color Code
            onPress={() => handleLink('https://t.me/yourusername')} 
          />

          {/* Check for Update */}
          <SettingItem 
            icon="refresh-outline" 
            title="Check for Update" 
            iconColor="#55efc4" 
            onPress={handleCheckUpdate} 
          />

        </View>

        {/* Bottom Links */}
        <TouchableOpacity style={styles.footerLink}>
          <Text style={styles.footerText}>Privacy Policy & Terms</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// ပြန်သုံးလို့ရမယ့် Setting Item Component
const SettingItem = ({ icon, title, onPress, iconColor = "white" }) => (
  <TouchableOpacity style={styles.itemCard} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={22} color={iconColor} />
      <Text style={styles.itemTitle}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#636e72" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121421' 
  },
  header: { 
    paddingHorizontal: 25, 
    paddingVertical: 20 
  },
  headerTitle: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: 'white' 
  },
  scrollContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 30 
  },
  menuGroup: { 
    gap: 12 
  },
  itemCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: '#1E222D', 
    paddingVertical: 18, 
    paddingHorizontal: 20, 
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  itemLeft: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  itemTitle: { 
    color: 'white', 
    fontSize: 16, 
    marginLeft: 15,
    fontWeight: '500'
  },
  footerLink: { 
    marginTop: 40, 
    alignItems: 'center' 
  },
  footerText: { 
    color: '#636e72', 
    fontSize: 14, 
    textDecorationLine: 'underline' 
  }
});

export default SettingsScreen;