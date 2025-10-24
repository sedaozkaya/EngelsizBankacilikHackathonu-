import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const IslemlerMenuScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  const menuItems = [
    { id: '1', name: 'Hesaplar', icon: 'briefcase' },
    { id: '2', name: 'Krediler', icon: 'credit-card' },
    { id: '3', name: 'Kartlar', icon: 'card' },
    { id: '4', name: 'Para Gönder', icon: 'send' },
    { id: '5', name: 'Ödemeler', icon: 'receipt' },
    { id: '6', name: 'Döviz ve Altın İşlemleri', icon: 'swap-horizontal' },
    { id: '7', name: 'Yatırım Fonu ve Repo İşlemleri', icon: 'trending-up' },
    { id: '8', name: 'Hisse Senedi İşlemleri', icon: 'analytics' },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuItemPress = (item) => {
    if (item.name === 'Ödemeler') {
      navigation.navigate('Odemeler');
    } else if (item.name === 'Para Gönder') {
      navigation.navigate('SendMoney');
    } else {
      console.log('Menü öğesi seçildi:', item.name);
      // Diğer menü öğeleri için ilgili ekranlara yönlendirme yapılabilir
    }
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.menuItem} 
      activeOpacity={0.7}
      onPress={() => handleMenuItemPress(item)}
    >
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.menuText}>{item.name}</Text>
      <Icon name="chevron-forward" size={24} color="#999999" />
    </TouchableOpacity>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A91F5B" />
      
      <View style={styles.content}>
        {/* Arama Çubuğu */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="İşlem adını giriniz"
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* İşlem Listesi */}
        <FlatList
          data={filteredMenuItems}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* Kapatma Butonu */}
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Icon name="close" size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Tab Bar */}
      <View
        style={{
          ...styles.bottomTabBar,
          paddingBottom: insets.bottom, // Dynamically adjust padding
        }}
      >
        {/* ...existing code... */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    padding: 0,
  },
  listContainer: {
    paddingBottom: 100,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#A91F5B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#A91F5B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginLeft: 74,
  },
  closeButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  closeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#A91F5B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default IslemlerMenuScreen;
