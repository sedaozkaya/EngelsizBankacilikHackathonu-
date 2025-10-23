import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const BasvurularScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Tümü');

  const tabs = ['Tümü', 'Hesaplar', 'Kartlar', 'Krediler'];

  const basvuruData = [
    {
      category: 'VOV Hesap',
      icon: 'briefcase-outline',
      items: [
        {
          id: '1',
          title: 'VOV TL/YP Hesap Açılışı',
          description: 'Günlük faiz kazandıran vadesiz hesap!',
        },
      ],
    },
    {
      category: 'Kredi',
      icon: 'cash-outline',
      items: [
        {
          id: '2',
          title: 'İhtiyaç Kredisi',
          description: 'Hızlı ve kolay kredi başvurusu',
        },
        {
          id: '3',
          title: 'Konut Kredisi',
          description: 'Uygun faizli konut kredisi fırsatları',
        },
      ],
    },
    {
      category: 'Yatırım Hesabı',
      icon: 'trending-up',
      items: [
        {
          id: '4',
          title: 'Yatırım Hesabı Açılışı',
          description: 'Hisse senedi ve fon işlemleri için',
        },
      ],
    },
    {
      category: 'Ekstra Hesap (KMH)',
      icon: 'wallet-outline',
      items: [
        {
          id: '5',
          title: 'Ekstra Hesap Başvurusu',
          description: 'Ekstra limit ve avantajlar',
        },
      ],
    },
  ];

  const handleItemPress = (item) => {
    console.log('Başvuru seçildi:', item.title);
    // Burada ilgili başvuru detay sayfasına yönlendirme yapılabilir
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Özel Header */}
      <View style={styles.header}>
        <View style={styles.headerBackground}>
          <Text style={styles.logoText}>S</Text>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Başvurular</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Sekme Menüsü */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* İçerik Listesi */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {basvuruData.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.groupContainer}>
            {/* Kategori Başlığı */}
            <View style={styles.categoryHeader}>
              <Ionicons name={group.icon} size={20} color="#900C3F" />
              <Text style={styles.categoryTitle}>{group.category}</Text>
            </View>

            {/* Başvuru Öğeleri */}
            <View style={styles.itemsContainer}>
              {group.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.basvuruItem,
                    itemIndex === group.items.length - 1 && styles.lastItem,
                  ]}
                  onPress={() => handleItemPress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#999999" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
          <Ionicons name="paper-plane-outline" size={24} color="#666" />
          <Text style={styles.tabItemText}>PARA GÖNDER</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="document" size={24} color="#A91F5B" />
          <Text style={[styles.tabItemText, styles.activeTabItem]}>BAŞVURULAR</Text>
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'absolute',
    right: 20,
    top: -20,
    opacity: 0.05,
  },
  logoText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: '#900C3F',
  },
  backButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
    zIndex: 1,
  },
  headerRight: {
    width: 44,
  },

  // Tab Navigation Styles
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#900C3F',
    borderColor: '#900C3F',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
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
  groupContainer: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 4,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 8,
  },
  itemsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  basvuruItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  itemDescription: {
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

export default BasvurularScreen;
