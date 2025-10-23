import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OdemelerScreen = ({ navigation }) => {
  const odemeMenuItems = [
    'Fatura Ödeme',
    'Fatura Ödeme Talimatları',
    'Ödeme Geçmişi Görüntüleme',
    'Kayıtlı Faturalarım',
    'Kart Ödemesi',
    'MTV Ödemesi',
    'Yurt Dışı Çıkış Harcı Ödeme',
    'Trafik Cezası Ödeme',
    'Diğer Vergi Ödemeleri',
    'Geçmiş Diğer Vergi Ödemeleri (Vergi Tahsil Alındısı)',
    'SGK Ödemesi',
  ];

  const handleMenuItemPress = (item) => {
    console.log('Menü öğesi seçildi:', item);
    // Burada ilgili ödeme ekranına yönlendirme yapılabilir
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Üst Navigasyon Çubuğu */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ödemeler</Text>
        <View style={styles.headerRight} />
      </View>

      {/* İşlem Listesi */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {odemeMenuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item)}
            activeOpacity={0.6}
          >
            <Text style={styles.menuItemText}>{item}</Text>
          </TouchableOpacity>
        ))}

        {/* Alt Boşluk */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.tabItemText}>ANA SAYFA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="card" size={24} color="#A91F5B" />
          <Text style={[styles.tabItemText, styles.activeTabItem]}>ÖDEMELER</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItemCenter} onPress={() => navigation.navigate('IslemlerMenu')}>
          <View style={styles.centerIconCircle}>
            <Ionicons name="menu-outline" size={28} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="paper-plane-outline" size={24} color="#666" />
          <Text style={styles.tabItemText}>PARA GÖNDER</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="document-outline" size={24} color="#666" />
          <Text style={styles.tabItemText}>BAŞVURULAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 100,
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '400',
  },
  bottomSpacer: {
    height: 40,
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 5,
  },
  tabItemCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  centerIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#A91F5B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemText: {
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  activeTabItem: {
    color: '#A91F5B',
    fontWeight: '600',
  },
});

export default OdemelerScreen;
