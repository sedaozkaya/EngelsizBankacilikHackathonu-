import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SendMoneyScreen = ({ navigation }) => {
  const transferOptions = [
    {
      id: '1',
      title: 'Kendi Hesaplarım Arası',
      icon: 'swap-horizontal-outline',
      description: 'Hesaplarınız arasında para transferi',
    },
    {
      id: '2',
      title: 'Alternatif Bank Hesabına',
      icon: 'business-outline',
      description: 'Alternatif Bank müşterilerine havale',
    },
    {
      id: '3',
      title: 'Başka Bankaya Havale',
      icon: 'send-outline',
      description: 'IBAN ile diğer bankalara transfer',
    },
    {
      id: '4',
      title: 'QR Kod ile Para Gönder',
      icon: 'qr-code-outline',
      description: 'QR kod okutarak hızlı transfer',
    },
    {
      id: '5',
      title: 'Yurt Dışına Para Gönder',
      icon: 'globe-outline',
      description: 'Uluslararası para transferi',
    },
    {
      id: '6',
      title: 'Havale Talimatları',
      icon: 'calendar-outline',
      description: 'Otomatik havale ayarları',
    },
  ];

  const handleTransferOption = (option) => {
    console.log('Transfer seçeneği seçildi:', option.title);
    // Burada ilgili transfer ekranına yönlendirme yapılabilir
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Para Gönder</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Transfer Seçenekleri */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {transferOptions.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionCard,
              index === transferOptions.length - 1 && styles.lastCard,
            ]}
            onPress={() => handleTransferOption(option)}
            activeOpacity={0.7}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name={option.icon} size={28} color="#A91F5B" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999999" />
          </TouchableOpacity>
        ))}

        {/* Alt Boşluk */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.tabItemText}>ANA SAYFA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Odemeler')}
        >
          <Ionicons name="card-outline" size={24} color="#666" />
          <Text style={styles.tabItemText}>ÖDEMELER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItemCenter}
          onPress={() => navigation.navigate('IslemlerMenu')}
        >
          <View style={styles.centerIconCircle}>
            <Ionicons name="menu-outline" size={28} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="paper-plane" size={24} color="#A91F5B" />
          <Text style={[styles.tabItemText, styles.activeTabItem]}>PARA GÖNDER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Basvurular')}
        >
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
    backgroundColor: '#F5F5F5',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
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

  // Content Styles
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lastCard: {
    marginBottom: 0,
  },
  optionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8F0F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    color: '#999999',
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 20,
  },

  // Bottom Tab Bar Styles
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

export default SendMoneyScreen;
