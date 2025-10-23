import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Hesaplar');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="İşlem adını giriniz"
              placeholderTextColor="#999"
            />
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileText}>AÖ</Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </View>
        </View>

        {/* Sekmeler */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => setActiveTab('Hesaplar')}
          >
            <Text style={[styles.tabText, activeTab === 'Hesaplar' && styles.activeTabText]}>
              Hesaplar
            </Text>
            {activeTab === 'Hesaplar' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.tab}
            onPress={() => setActiveTab('Kartlar')}
          >
            <Text style={[styles.tabText, activeTab === 'Kartlar' && styles.activeTabText]}>
              Kartlar
            </Text>
            {activeTab === 'Kartlar' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.tab}
            onPress={() => setActiveTab('Finansal Durum')}
          >
            <Text style={[styles.tabText, activeTab === 'Finansal Durum' && styles.activeTabText]}>
              Finansal Durum
            </Text>
            {activeTab === 'Finansal Durum' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>

        {/* VOV Hesap Kartı */}
        <View style={styles.vovCard}>
          <View style={styles.vovHeader}>
            <View style={styles.vovLogo}>
              <Text style={styles.vovLogoText}>VOV</Text>
            </View>
          </View>
          <Text style={styles.vovTitle}>VOV Hesap</Text>
          <Text style={styles.vovIban}>TR040012400000562217000001</Text>
          <Text style={styles.vovBalance}>1.000.000,00 TL</Text>
          <Text style={styles.vovAvailable}>Kullanılabilir Bakiye 879.994,64 TL</Text>
        </View>

        {/* Hızlı İşlem İkonları */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="list-outline" size={28} color="#A91F5B" />
            </View>
            <Text style={styles.quickActionText}>Hareketler</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="cash-outline" size={28} color="#A91F5B" />
            </View>
            <Text style={styles.quickActionText}>Para Gönder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="document-text-outline" size={28} color="#A91F5B" />
            </View>
            <Text style={styles.quickActionText}>Fatura Öde</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="share-social-outline" size={28} color="#A91F5B" />
            </View>
            <Text style={styles.quickActionText}>IBAN Paylaş</Text>
          </TouchableOpacity>
        </View>

        {/* Tüm Hesaplar Link */}
        <TouchableOpacity style={styles.allAccountsLink}>
          <Text style={styles.allAccountsText}>Tüm Hesaplar</Text>
          <Ionicons name="chevron-forward" size={20} color="#A91F5B" />
        </TouchableOpacity>

        {/* VOV ve Yatırım Kartları */}
        <View style={styles.cardsSection}>
          <TouchableOpacity style={styles.infoCard}>
            <View style={styles.infoCardContent}>
              <Ionicons name="rocket-outline" size={24} color="#A91F5B" />
              <Text style={styles.infoCardText}>VOV Ek Faiz Dünyası</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A91F5B" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoCard}>
            <View style={styles.infoCardContent}>
              <Ionicons name="trending-up-outline" size={24} color="#A91F5B" />
              <Text style={styles.infoCardText}>Yatırım Fonu Al / Sat</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A91F5B" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoCard}>
            <View style={styles.infoCardContent}>
              <Ionicons name="person-outline" size={24} color="#A91F5B" />
              <Text style={styles.infoCardText}>Danışmanım İletişime Geç</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A91F5B" />
          </TouchableOpacity>
        </View>

        {/* Reklam Banner */}
        <View style={styles.adBanner}>
          <View style={styles.adContent}>
            <Text style={styles.adTitle}>
              Yatırım İşlemleri Alternatif Bank Mobil ile kolaylaşıyor.
            </Text>
            <Text style={styles.adDescription}>
              Yatırım hesabı açmak ve hesabınızla işlem yapmak için hemen tıklayın!
            </Text>
          </View>
          <View style={styles.adImagePlaceholder}>
            <Ionicons name="phone-portrait-outline" size={60} color="#FFFFFF" />
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#A91F5B" />
          <Text style={[styles.tabItemText, styles.activeTabItem]}>ANA SAYFA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Odemeler')}>
          <Ionicons name="card-outline" size={24} color="#666" />
          <Text style={styles.tabItemText}>ÖDEMELER</Text>
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

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Basvurular')}>
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 8,
  },
  searchIcon: {
    marginLeft: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#A91F5B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  profileText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Sekmeler Styles
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  tab: {
    marginRight: 25,
    paddingBottom: 12,
  },
  tabText: {
    fontSize: 15,
    color: '#999',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#333',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#A91F5B',
    borderRadius: 2,
  },

  // VOV Kart Styles
  vovCard: {
    backgroundColor: '#5D2E7A',
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  vovHeader: {
    marginBottom: 15,
  },
  vovLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vovLogoText: {
    color: '#5D2E7A',
    fontSize: 12,
    fontWeight: 'bold',
  },
  vovTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 5,
  },
  vovIban: {
    fontSize: 12,
    color: '#E0D0E8',
    marginBottom: 20,
  },
  vovBalance: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  vovAvailable: {
    fontSize: 13,
    color: '#E0D0E8',
  },

  // Hızlı İşlemler Styles
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },

  // Tüm Hesaplar Link
  allAccountsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  allAccountsText: {
    fontSize: 14,
    color: '#A91F5B',
    fontWeight: '600',
    marginRight: 5,
  },

  // Info Kartlar Styles
  cardsSection: {
    paddingHorizontal: 15,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoCardText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },

  // Reklam Banner Styles
  adBanner: {
    backgroundColor: '#A91F5B',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  adContent: {
    flex: 1,
    marginRight: 15,
  },
  adTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 22,
  },
  adDescription: {
    fontSize: 13,
    color: '#FFFFFF',
    lineHeight: 18,
  },
  adImagePlaceholder: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
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

export default DashboardScreen;
