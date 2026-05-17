import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={{ width: 26 }} /> {/* Header Title ကို အလယ်ဗဟိုကျစေရန် Counter space ပေးထားခြင်း */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* App Logo & Name Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoPlaceholder}>
            <Ionicons name="document-text" size={60} color="#6C5CE7" />
          </View>
          <Text style={styles.appName}>ColorNote</Text>
          <Text style={styles.appVersion}>Version 1.1.0</Text>
        </View>

        {/* Description Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What is ColorNote?</Text>
          <Text style={styles.cardBody}>
            ColorNote သည် သင့်စိတ်ကူးစိတ်သန်းများ၊ နေ့စဉ်မှတ်တမ်းများနှင့် အရေးကြီးသော အချက်အလက်များကို အရောင်အသွေးစုံလင်စွာဖြင့် လွယ်ကူလျင်မြန်စွာ မှတ်သားနိုင်ရန် ဖန်တီးထားသည့် ရိုးရှင်းသေသပ်သော Note-taking App တစ်ခု ဖြစ်သည်။
          </Text>
        </View>

        {/* Developer Info Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Developer Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Developed By:</Text>
            <Text style={styles.infoValue}>DynamixWave</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Release Year:</Text>
            <Text style={styles.infoValue}>2026</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Powered By:</Text>
            <Text style={styles.infoValue}>React Native & Expo</Text>
          </View>
        </View>

        {/* Copyright Text */}
        <Text style={styles.copyrightText}>
          © 2026 DynamixWave. All rights reserved.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121421',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logoPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 30,
    backgroundColor: '#1E222D',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 15,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  appVersion: {
    fontSize: 14,
    color: '#636e72',
    marginTop: 5,
  },
  card: {
    width: '100%',
    backgroundColor: '#1E222D',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C5CE7',
    marginBottom: 12,
  },
  cardBody: {
    fontSize: 14,
    color: '#b2bec3',
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3436',
  },
  infoLabel: {
    fontSize: 14,
    color: '#636e72',
  },
  infoValue: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  copyrightText: {
    fontSize: 12,
    color: '#636e72',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default AboutScreen;