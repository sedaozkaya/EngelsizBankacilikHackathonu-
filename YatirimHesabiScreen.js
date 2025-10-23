import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OPENAI_API_KEY, OPENAI_API_ENDPOINT, OPENAI_API_VERSION, OPENAI_DEPLOYMENT_NAME } from '@env';

// Tam Ekran Modal Bileşeni
const SozlesmeOzetModal = ({ visible, onClose }) => {
  const [loading, setLoading] = React.useState(true);
  const [bilgilendirmeMetni, setBilgilendirmeMetni] = React.useState('');
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (visible) {
      fetchContractSummary();
    }
  }, [visible]);

  const fetchContractSummary = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const deploymentName = OPENAI_DEPLOYMENT_NAME || 'contrat-summarizer';
      const baseEndpoint = OPENAI_API_ENDPOINT.endsWith('/') 
        ? OPENAI_API_ENDPOINT.slice(0, -1) 
        : OPENAI_API_ENDPOINT;
      const apiUrl = `${baseEndpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${OPENAI_API_VERSION}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': OPENAI_API_KEY,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'Sen bir bankacılık uzmanısın. Yatırım hesabı sözleşmelerini bilgilendirici bir şekilde kullanıcıya aktarıyorsun. Türkçe ve anlaşılır bir dille cevap veriyorsun.',
            },
            {
              role: 'user',
              content: 'Bu sözleşme ile ilgili bilgilendirici bir içerik üret.',
            },
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error('API hatası');

      const data = await response.json();
      const infoText = data.choices[0]?.message?.content || 'Bilgilendirici metin oluşturulamadı.';
      setBilgilendirmeMetni(infoText);
      setError(null);
      setLoading(false);
      
    } catch (err) {
      setError(err.message || 'Bilgilendirici metin yüklenirken beklenmeyen bir hata oluştu.');
      const fallbackText = `
📄 YATIRIM HESABı BİLGİLENDİRİCİ METNİ
(Yedek İçerik - API Bağlantısı Kurulamadı)

🔷 Ana Noktalar:
• Yatırım hesabı üzerinden hisse senedi, yatırım fonu, tahvil ve bono işlemleri yapılabilir
• 7/24 online işlem kolaylığı
• Hesap işletim ücreti, portföy büyüklüğüne göre değişebilir

⚠️ Önemli Riskler:
• Sermaye piyasası araçları değer kaybı riski taşır
• Yatırım kararları kendi sorumluluğunuzdadır
• Kaldıraçlı işlemlerde ek risk bulunur

💰 Ücret ve Komisyonlar:
• İşlem komisyonu: %0.2
• Hesap işletim ücreti: Yıllık 50 TL
• Portföy değeri 10.000 TL üzeri ise işletim ücreti yok

📋 Hesap Kapatma ve İptal:
• Herhangi bir zamanda hesap kapatılabilir
• Açık pozisyonlar kapatıldıktan sonra işlem tamamlanır

🔒 Güvenlik Önlemleri:
• 256-bit SSL şifreleme
• İki faktörlü kimlik doğrulama
• Anlık SMS/e-posta bildirimleri

📞 Destek ve İletişim:
• 7/24 Çağrı Merkezi: 444 0 123
• E-posta: destek@alternatifbank.com
• Mobil uygulama üzerinden canlı destek

${new Date().toLocaleDateString('tr-TR')} tarihinde oluşturuldu.
      `;
      setBilgilendirmeMetni(fallbackText);
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <View style={styles.closeButtonCircle}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Bilgilendirici Metin</Text>
          <View style={styles.headerSpacer} />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#900C3F" />
            <Text style={styles.loadingText}>Bilgilendirici metin hazırlanıyor...</Text>
            <Text style={styles.apiInfo}>Azure OpenAI API üzerinden bilgilendirici metin oluşturuluyor</Text>
          </View>
        ) : (
          <ScrollView
            style={styles.modalScrollView}
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.apiIndicator}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.apiIndicatorText}>Azure OpenAI API ile Bilgilendirici Metin Üretildi</Text>
            </View>
            {error && (
              <View style={styles.errorIndicator}>
                <Ionicons name="alert-circle" size={20} color="#FF9800" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            <Text style={styles.ozetText}>{bilgilendirmeMetni}</Text>
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
};

// Ana Ekran Bileşeni
const YatirimHesabiScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const sozlesmeMetni = `
YATIRIM HESABı SÖZLEŞMESİ
...
(Detaylı sözleşme metni buraya gelir)
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yatırım Hesabı Sözleşmesi</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.ozetButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="document-text-outline" size={24} color="#FFFFFF" />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.ozetButtonText}>Bilgilendirici Metni Gör</Text>
            <Text style={styles.ozetButtonSubtext}>(Azure OpenAI API ile oluşturulan bilgilendirici metin)</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.sozlesmeText}>{sozlesmeMetni}</Text>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <SozlesmeOzetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
    fontSize: 17,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 44,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  ozetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#900C3F',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  ozetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ozetButtonSubtext: {
    fontSize: 12,
    color: '#FFE0E0',
    marginTop: 2,
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 20 },
  sozlesmeText: { fontSize: 14, lineHeight: 24, color: '#333333', textAlign: 'justify' },
  bottomSpacer: { height: 40 },
  modalContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  closeButton: { zIndex: 1 },
  closeButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#900C3F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  modalTitle: { fontSize: 18, fontWeight: '600', color: '#333333', flex: 1, textAlign: 'center' },
  headerSpacer: { width: 44 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  loadingText: { fontSize: 16, fontWeight: '500', color: '#333333', marginTop: 20 },
  apiInfo: { fontSize: 13, color: '#999999', marginTop: 8 },
  modalScrollView: { flex: 1 },
  modalScrollContent: { paddingHorizontal: 20, paddingVertical: 20 },
  apiIndicator: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, marginBottom: 20 },
  apiIndicatorText: { fontSize: 14, fontWeight: '500', color: '#4CAF50', marginLeft: 8 },
  errorIndicator: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#FFF3E0', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, marginBottom: 16 },
  errorText: { fontSize: 13, color: '#F57C00', marginLeft: 8, flex: 1 },
  ozetText: { fontSize: 15, lineHeight: 26, color: '#333333', textAlign: 'left' },
});

export default YatirimHesabiScreen;
