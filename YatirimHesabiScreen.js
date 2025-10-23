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
import { OPENAI_API_KEY, OPENAI_API_ENDPOINT, OPENAI_API_VERSION } from '@env';

// Tam Ekran Modal Bileşeni
const SozlesmeOzetModal = ({ visible, onClose }) => {
  const [loading, setLoading] = React.useState(true);
  const [ozetMetni, setOzetMetni] = React.useState('');
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (visible) {
      // API çağrısı
      fetchContractSummary();
    }
  }, [visible]);

  const fetchContractSummary = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Azure OpenAI API çağrısı
      const apiUrl = `${OPENAI_API_ENDPOINT}openai/deployments/gpt-4o/chat/completions?api-version=${OPENAI_API_VERSION}`;
      
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
              content: 'Sen bir bankacılık uzmanısın. Yatırım hesabı sözleşmelerini özetleme konusunda uzmanlaşmışsın. Türkçe ve anlaşılır bir dille cevap veriyorsun.',
            },
            {
              role: 'user',
              content: `Aşağıdaki yatırım hesabı sözleşmesinin önemli noktalarını, riskleri, komisyonları ve iptal koşullarını özetler misin? Özeti madde madde ve emojiler kullanarak yaz:

YATIRIM HESABı SÖZLEŞMESİ

Müşteri, Banka nezdinde yatırım hesabı açtırmış olup, bu hesap üzerinden hisse senedi, yatırım fonu, tahvil ve bono işlemleri yapabilecektir. Sermaye piyasası araçlarına yapılan yatırımlar risk içermektedir. İşlem komisyonu %0.2, hesap işletim ücreti yıllık 50 TL'dir. Portföy değeri 10.000 TL'nin üzerinde ise işletim ücreti alınmaz. Müşteri herhangi bir zamanda hesabını kapatma talebinde bulunabilir.`,
            },
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API çağrısı başarısız: ${response.status}`);
      }

      const data = await response.json();
      const summary = data.choices[0]?.message?.content || 'Özet oluşturulamadı.';
      
      setOzetMetni(summary);
      setLoading(false);
    } catch (err) {
      console.error('API Hatası:', err);
      setError('Sözleşme özeti yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      
      // Hata durumunda yedek metin göster
      const fallbackText = `
⚠️ API bağlantısı kurulamadı. Geçici özet gösteriliyor:

🔷 Ana Özellikler:
Yatırım hesabınız ile hisse senedi, fon, tahvil ve diğer yatırım araçlarında işlem yapabilirsiniz.

⚠️ Riskler:
• Sermaye piyasası araçlarına yatırım yapmak, değer kaybı riski içerir.
• Geçmiş performans, gelecekteki getiriyi garanti etmez.

💰 Komisyon ve Ücretler:
• İşlem başına %0.2 komisyon
• Hesap işletim ücreti yıllık 50 TL
• 10.000 TL üzeri portföyde işletim ücreti muaf

📋 İptal Koşulları:
Sözleşmeyi istediğiniz zaman iptal edebilirsiniz.
      `;
      setOzetMetni(fallbackText);
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
        {/* Modal Header */}
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
          <Text style={styles.modalTitle}>Sözleşme Özeti</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Modal Content */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#900C3F" />
            <Text style={styles.loadingText}>Sözleşme özeti oluşturuluyor...</Text>
            <Text style={styles.apiInfo}>Azure OpenAI API ile veri çekiliyor</Text>
          </View>
        ) : (
          <ScrollView
            style={styles.modalScrollView}
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.apiIndicator}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.apiIndicatorText}>Azure OpenAI API ile Üretildi</Text>
            </View>
            {error && (
              <View style={styles.errorIndicator}>
                <Ionicons name="alert-circle" size={20} color="#FF9800" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            <Text style={styles.ozetText}>{ozetMetni}</Text>
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

MADDE 1 - TARAFLAR VE SÖZLEŞMENİN KONUSU

İşbu sözleşme, bir taraftan Alternatif Bank A.Ş. (bundan böyle "Banka" olarak anılacaktır) ile diğer taraftan aşağıda bilgileri yer alan müşteri (bundan böyle "Müşteri" olarak anılacaktır) arasında aşağıda belirtilen şartlar dahilinde akdedilmiştir.

MADDE 2 - HİZMET KAPSAMI

2.1. Müşteri, işbu sözleşme kapsamında Banka nezdinde yatırım hesabı açtırmış olup, bu hesap üzerinden:
   a) Hisse senedi alım-satım işlemleri
   b) Yatırım fonu alım-satım işlemleri
   c) Tahvil ve bono işlemleri
   d) Vadeli işlem ve opsiyon sözleşmeleri
   e) Diğer sermaye piyasası araçları işlemleri
yapabilecektir.

2.2. Banka, müşteriye bu hizmetleri sunmakla birlikte, yatırım danışmanlığı hizmeti vermemektedir. Tüm yatırım kararları müşterinin kendi sorumluluğundadır.

MADDE 3 - RİSKLER

3.1. Sermaye piyasası araçlarına yapılan yatırımlar risk içermektedir. Geçmiş performans, gelecekteki getiriyi garanti etmez.

3.2. Müşteri, yatırım yapmadan önce ilgili ürünün risk ve getiri profilini incelemekle yükümlüdür.

3.3. Kaldıraçlı işlemler, müşterinin yatırdığı tutardan daha fazla zarar etme riskini içermektedir.

MADDE 4 - ÜCRETLENDİRME

4.1. İşlem komisyonu: Her alım-satım işlemi için işlem tutarının %0.2'si
4.2. Hesap işletim ücreti: Yıllık 50 TL (Portföy değeri 10.000 TL'nin üzerinde ise muaftır)
4.3. Saklama ücreti: Yıllık portföy değerinin %0.05'i
4.4. Repo/Ters Repo işlem komisyonu: İşlem tutarının %0.015'i

MADDE 5 - HESABIN KAPATILMASI

5.1. Müşteri, herhangi bir zamanda hesabını kapatma talebinde bulunabilir.
5.2. Hesap kapatılmadan önce, tüm açık pozisyonların kapatılması gerekmektedir.
5.3. Hesap bakiyesi, müşterinin talimatı doğrultusunda kendisine iade edilir.

MADDE 6 - GİZLİLİK VE GÜVENLİK

6.1. Banka, müşteri bilgilerinin gizliliğini korumayı ve 6698 sayılı Kişisel Verilerin Korunması Kanunu'na uygun hareket etmeyi taahhüt eder.

6.2. Tüm işlemler 256-bit SSL şifreleme ile korunmaktadır.

6.3. İki faktörlü kimlik doğrulama sistemi varsayılan olarak aktiftir.

MADDE 7 - İHTİLAFLARIN ÇÖZÜMÜ

İşbu sözleşmeden doğabilecek her türlü uyuşmazlıkların çözümünde İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.

MADDE 8 - YÜRÜRLÜK

İşbu sözleşme, taraflarca imzalandığı tarihte yürürlüğe girer ve taraflardan biri feshetmedikçe yürürlükte kalır.

Sözleşme tarihi: ${new Date().toLocaleDateString('tr-TR')}

Bu sözleşmenin detaylı bir özetini görmek için yukarıdaki butona tıklayabilirsiniz. Özet, yapay zeka destekli API ile otomatik olarak üretilmektedir.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
  `;

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
        <Text style={styles.headerTitle}>Yatırım Hesabı Sözleşmesi</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Bilgilendirici Buton */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.ozetButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="document-text-outline" size={24} color="#FFFFFF" />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.ozetButtonText}>Sözleşme Özetini Gör</Text>
            <Text style={styles.ozetButtonSubtext}>(Azure OpenAI API ile Üretildi)</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Sözleşme Metni */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.sozlesmeText}>{sozlesmeMetni}</Text>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Modal */}
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
    fontSize: 17,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 44,
  },

  // Button Container Styles
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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

  // ScrollView Styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sozlesmeText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#333333',
    textAlign: 'justify',
  },
  bottomSpacer: {
    height: 40,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
  closeButton: {
    zIndex: 1,
  },
  closeButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#900C3F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginTop: 20,
  },
  apiInfo: {
    fontSize: 13,
    color: '#999999',
    marginTop: 8,
  },

  // Modal Content Styles
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  apiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  apiIndicatorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
    marginLeft: 8,
  },
  errorIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3E0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    color: '#F57C00',
    marginLeft: 8,
    flex: 1,
  },
  ozetText: {
    fontSize: 15,
    lineHeight: 26,
    color: '#333333',
    textAlign: 'left',
  },
});

export default YatirimHesabiScreen;
