import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    // Giriş yap butonuna tıklandığında Dashboard'a yönlendir
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header - Logo ve Dil Seçimi */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Alternatif Bank</Text>
          <View style={styles.waveLine} />
        </View>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>TR</Text>
          <Ionicons name="chevron-down" size={16} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Profil Alanı */}
      <View style={styles.profileSection}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileInitials}>AÖ</Text>
        </View>
        <Text style={styles.profileName}>AYŞE ÖZAĞAOĞLU</Text>
        <TouchableOpacity>
          <Text style={styles.forgetMeText}>Beni Unut</Text>
        </TouchableOpacity>
      </View>

      {/* Şifre Giriş Alanı */}
      <View style={styles.passwordSection}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Şifre"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Giriş Butonu */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Giriş Yap</Text>
      </TouchableOpacity>

      {/* Bağlantı Metinleri */}
      <View style={styles.linksSection}>
        <Text style={styles.linkText}>
          Şifremi Unuttum / Sim Kart ve Cihaz Değişikliği
        </Text>
      </View>

      {/* Banner/Reklam Alanı */}
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <View style={styles.bannerIconContainer}>
            <Ionicons name="card-outline" size={28} color="#A91F5B" />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>
              Avantajlı oranlarla ihtiyaç kredisini kaçırmayın!
            </Text>
          </View>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Hemen Başvur</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Versiyon Bilgisi */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Ver. 1.45.0 - DEVELOPMENT</Text>
      </View>

      {/* Bottom Tab Bar */}
      <View
        style={{
          ...styles.bottomTabBar,
          paddingBottom: insets.bottom, // Dynamically adjust padding
        }}
      >
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="flash-outline" size={24} color="#666" />
          <Text style={styles.tabText}>FAST{'\n'}İŞLEMLERİ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#666" />
          <Text style={styles.tabText}>ALTERNATİF{'\n'}ONAY</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItemCenter}>
          <View style={styles.centerIconCircle}>
            <Ionicons name="menu-outline" size={28} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="cart-outline" size={24} color="#666" />
          <Text style={styles.tabText}>ALIŞVERİŞ{'\n'}KREDİSİ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="qr-code-outline" size={24} color="#666" />
          <Text style={styles.tabText}>KAREKOD{'\n'}İŞLEMLERİ</Text>
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
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  waveLine: {
    width: 40,
    height: 3,
    backgroundColor: '#A91F5B',
    marginLeft: 8,
    borderRadius: 2,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },

  // Profil Alanı Styles
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#A91F5B',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileInitials: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#A91F5B',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  forgetMeText: {
    fontSize: 14,
    color: '#D084A9',
    marginTop: 5,
  },

  // Şifre Giriş Alanı Styles
  passwordSection: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 5,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  eyeIcon: {
    padding: 5,
  },

  // Giriş Butonu Styles
  loginButton: {
    backgroundColor: '#A91F5B',
    marginHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Bağlantı Metinleri Styles
  linksSection: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  linkText: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
  },

  // Banner Styles
  bannerContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  banner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerIconContainer: {
    marginRight: 12,
  },
  bannerTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  bannerText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  applyButton: {
    backgroundColor: '#A91F5B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },

  // Versiyon Bilgisi Styles
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  versionText: {
    fontSize: 11,
    color: '#999',
  },

  // Bottom Tab Bar Styles
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
  tabText: {
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 12,
  },
});

export default LoginScreen;
