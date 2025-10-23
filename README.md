# Alternatif Bank Login Screen - React Native

Bu proje, Alternatif Bank mobil uygulamasının giriş ekranını React Native ile oluşturulmuş bir bileşen içerir.

## 🎨 Özellikler

- **Functional Component**: Modern React Hooks kullanımı
- **Türkçe Desteği**: Tüm metinler Türkçe karakter desteğiyle
- **Responsive Tasarım**: Farklı ekran boyutlarına uyumlu
- **İnteraktif Elementler**: Şifre görünürlük toggle, tıklanabilir butonlar
- **Alternatif Bank Renk Paleti**: #A91F5B ana renk

## 📱 Ekran Bileşenleri

### 1. Header (Üst Kısım)
- Alternatif Bank logosu ve dalgalı çizgi
- Dil seçimi butonu (TR)

### 2. Profil Alanı
- Kullanıcı baş harfleri (AÖ) ile büyük pembe çerçeveli daire
- Kullanıcı adı: AYŞE ÖZAĞAOĞLU
- "Beni Unut" bağlantısı

### 3. Şifre Giriş Alanı
- Şifre TextInput
- Göz ikonu ile şifre görünürlük kontrolü

### 4. Giriş Butonu
- Tam genişlikte, ana renk (#A91F5B) arka planlı buton
- "Giriş Yap" metni

### 5. Yardım Bağlantıları
- "Şifremi Unuttum / Sim Kart ve Cihaz Değişikliği"

### 6. Banner/Reklam Alanı
- Kredi kartı ikonu
- "Avantajlı oranlarla ihtiyaç kredisini kaçırmayın!"
- "Hemen Başvur" butonu

### 7. Versiyon Bilgisi
- Ver. 1.45.0 - DEVELOPMENT

### 8. Bottom Navigation Bar
- 5 tab item:
  - FAST İŞLEMLERİ
  - ALTERNATİF ONAY
  - Menü (ortada, pembe daire içinde)
  - ALIŞVERİŞ KREDİSİ
  - KAREKOD İŞLEMLERİ

## 🚀 Kurulum

### Gereksinimler
```bash
node >= 14
npm veya yarn
React Native CLI
```

### Bağımlılıkları Yükleme
```bash
npm install
# veya
yarn install
```

### react-native-vector-icons Kurulumu

**iOS için:**
```bash
cd ios
pod install
cd ..
```

**Android için:**
`android/app/build.gradle` dosyasına ekleyin:
```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

## 💻 Kullanım

### Projenize Entegre Etme

```javascript
import React from 'react';
import LoginScreen from './LoginScreen';

const App = () => {
  return <LoginScreen />;
};

export default App;
```

### Çalıştırma

**Android:**
```bash
npx react-native run-android
```

**iOS:**
```bash
npx react-native run-ios
```

## 🎨 Renk Paleti

| Renk Adı | Hex Kodu | Kullanım Alanı |
|----------|----------|----------------|
| Ana Renk (Koyu Pembe/Bordo) | `#A91F5B` | Butonlar, çerçeveler, ikonlar |
| Açık Pembe | `#D084A9` | Beni Unut metni |
| Koyu Gri | `#333` | Ana metinler |
| Orta Gri | `#666` | İkonlar |
| Açık Gri | `#888` | İkincil metinler |
| Çok Açık Gri | `#999` | Placeholder metinler |
| Beyaz | `#FFFFFF` | Arka plan, buton metinleri |

## 📦 Bağımlılıklar

- `react`: ^18.2.0
- `react-native`: ^0.72.0
- `react-native-vector-icons`: ^10.0.0

## 🔧 Özelleştirme

### Stil Değişiklikleri
Tüm stiller `StyleSheet.create()` ile `LoginScreen.js` dosyasının alt kısmında tanımlanmıştır. İhtiyacınıza göre:

- Renkleri değiştirmek için ilgili `backgroundColor`, `color` değerlerini düzenleyin
- Boyutları ayarlamak için `fontSize`, `padding`, `margin` değerlerini değiştirin
- Border radius, shadow gibi detayları özelleştirin

### Fonksiyonellik Ekleme
Butonlara işlevsellik eklemek için `onPress` handler'larını güncelleyin:

```javascript
<TouchableOpacity 
  style={styles.loginButton}
  onPress={() => {
    // Giriş yapma mantığı
    console.log('Giriş yapılıyor...');
  }}
>
  <Text style={styles.loginButtonText}>Giriş Yap</Text>
</TouchableOpacity>
```

## 📱 Ekran Görünümü

Bileşen aşağıdaki yapıda organize edilmiştir:
```
SafeAreaView
  ├── Header (Logo + Dil Seçimi)
  ├── Profil Alanı (Daire, İsim, Beni Unut)
  ├── Şifre Input (TextInput + Göz İkonu)
  ├── Giriş Yap Butonu
  ├── Yardım Linkleri
  ├── Banner (Kredi Reklamı)
  ├── Versiyon Bilgisi
  └── Bottom Tab Bar (5 Tab)
```

## 📄 Lisans

Bu proje eğitim ve demo amaçlı oluşturulmuştur.

## 👨‍💻 Geliştirici Notları

- Bileşen functional component olarak yazılmıştır
- useState hook'u şifre görünürlük kontrolü için kullanılmıştır
- SafeAreaView ile farklı cihazlarda güvenli alan sağlanmıştır
- Flexbox ile responsive layout oluşturulmuştur
- TouchableOpacity bileşenleri butonlar için kullanılmıştır
- react-native-vector-icons/Ionicons icon seti tercih edilmiştir

## 🐛 Bilinen Sorunlar / Geliştirme Önerileri

- Logo yerine gerçek görsel dosyası kullanılabilir
- Navigation gerçek bir navigator (React Navigation) ile entegre edilebilir
- Form validasyonu eklenebilir
- Backend entegrasyonu yapılabilir
- Loading state'leri eklenebilir
- Hata mesajları için toast/alert sistemi eklenebilir
