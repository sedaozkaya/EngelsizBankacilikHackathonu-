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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OPENAI_API_KEY, OPENAI_API_ENDPOINT, OPENAI_API_VERSION, OPENAI_DEPLOYMENT_NAME } from '@env';

// Tam Ekran Modal Bileşeni
const SozlesmeOzetModal = ({ visible, onClose }) => {
  const [loading, setLoading] = React.useState(true);
  const [bilgilendirmeMetni, setBilgilendirmeMetni] = React.useState('');
  const [error, setError] = React.useState(null);

  const normalizeInformativeText = (text = '') => {
    return text
      .replace(/^[\s]*[*\-•#+>]+[\s]*/gm, '')
      .replace(/\*\*/g, '')
      .replace(/`/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

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
              content:
                'Sen bir bankacılık uzmanısın. Yatırım hesabı sözleşmelerini markdown veya madde işareti kullanmadan, düz metin halinde açık ve anlaşılır biçimde anlatıyorsun.',
            },
            {
              role: 'user',
              content:
                'Bu yatırım hesabı sözleşmesi hakkında, madde işareti ve markdown kullanmadan, düz yazı formatında bilgilendirici bir metin üret.',
            },
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error('API hatası');

      const data = await response.json();
      const infoText = data.choices[0]?.message?.content || 'Bilgilendirici metin oluşturulamadı.';
      setBilgilendirmeMetni(normalizeInformativeText(infoText));
      setError(null);
      setLoading(false);
      
    } catch (err) {
      setError(err.message || 'Bilgilendirici metin yüklenirken beklenmeyen bir hata oluştu.');
      const fallbackText = `Yatırım hesabı bilgilendirici metni geçici olarak çevrimdışı kaynaktan oluşturuldu.

Yatırım hesabınız üzerinden hisse senedi, yatırım fonu, tahvil ve bono gibi farklı sermaye piyasası araçlarında işlem yapabilirsiniz. İşlemler günün her saati dijital kanallar üzerinden gerçekleştirilebilir. Hesap işletim ücreti, portföy büyüklüğünüze göre değişiklik gösterebilir ve belirli bir eşiğin üzerindeki müşterilerden alınmaz.

Sermaye piyasası ürünleri değer kaybı riski taşır. Kaldıraçlı işlemler ek risk barındırır ve yatırım kararlarının sorumluluğu müşteriye aittir.

Her alım satım işleminde yüzde sıfır virgül iki oranında komisyon uygulanır. Hesap işletim ücreti yıllık elli Türk lirasıdır ve portföy değeri on bin Türk lirasının üzerinde olan müşteriler bu ücretten muaftır.

Hesabınızı istediğiniz zaman kapatabilirsiniz. Açık pozisyonlar kapatıldıktan ve bakiyeniz aktarıldıktan sonra süreç tamamlanır.

Tüm işlemler iki yüz elli altı bit SSL şifreleme ve iki faktörlü kimlik doğrulama ile korunur. SMS ve e-posta bildirimleri varsayılan olarak açıktır.

Destek için yirmi dört saat ulaşabileceğiniz çağrı merkezi hattı dört yüz kırk dört sıfır yüz yirmi üç numarasıdır. Ayrıca destek@alternatifbank.com adresine e-posta gönderebilir veya mobil uygulamadaki canlı destek kanalını kullanabilirsiniz.

Metnin son oluşturulma tarihi: ${new Date().toLocaleDateString('tr-TR')}.
  `;
      setBilgilendirmeMetni(normalizeInformativeText(fallbackText));
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
  const [hasReadToEnd, setHasReadToEnd] = useState(false);

  const sozlesmeMetni = `
YATIRIM HESABI SÖZLEŞMESİ

MADDE 1 – TARAFLAR VE TANIMLAR
Bu sözleşme, bir tarafta Alternatif Bank A.Ş. (Banka) ile diğer tarafta yatırım hizmetlerinden yararlanmak isteyen gerçek veya tüzel kişi Müşteri arasında, Banka nezdinde yatırım hesabı açılışı ve bu hesap üzerinden gerçekleştirilecek işlemlere ilişkin usul ve esasların belirlenmesi amacıyla akdedilmiştir. Sözleşmede yer alan terimler, yürürlükteki sermaye piyasası mevzuatında tanımlandığı şekilde yorumlanır.

MADDE 2 – SÖZLEŞMENİN KONUSU VE KAPSAMI
Müşteri, Banka nezdinde açılacak yatırım hesabı aracılığıyla, hisse senedi, borçlanma araçları, yatırım fonu katılma payları, yapılandırılmış ürünler ve uygun görülmesi halinde türev finansal araçlar dahil olmak üzere sermaye piyasası araçlarında alım satım ve saklama işlemleri yapabilir. Banka, sözleşme kapsamında emir iletimi, emirlerin gerçekleştirilmesi, saklama ve takas hizmetlerini mevzuata uygun biçimde sunar.

MADDE 3 – HESAP AÇILIŞI, DOĞRULAMA VE YÜKÜMLÜLÜKLER
Müşteri, kimlik tespiti, adres teyidi ve gerekli görülen diğer bilgi ve belgeleri eksiksiz sunmayı kabul eder. Müşteri bilgileri güncel tutulur; değişikliklerin derhal bildirilmemesinden kaynaklanan sonuçlar Müşteri sorumluluğundadır. Banka, mevzuat ve iç politika gereği başvuru değerlendirmesi yapabilir, hesabı açmama veya sınırlama getirme hakkını saklı tutar.

MADDE 4 – EMİRLERİN İLETİMİ VE GERÇEKLEŞTİRİLMESİ
Müşteri, emirlerini Bankanın sunduğu dijital kanallar, çağrı merkezi veya şube aracılığıyla iletebilir. Emirlerin geçerliliği, işlem platformunda görüntülenen zaman damgasına ve piyasa koşullarına bağlıdır. Piyasada sirkülasyon, likidite veya fiyat dalgalanmaları sebebiyle emrin kısmen veya tamamen gerçekleşmemesi mümkündür. Müşteri, emir tipleri ve riskleri hakkında bilgilendirildiğini kabul eder.

MADDE 5 – FİYATLANDIRMA, ÜCRET VE KOMİSYONLAR
İşlemler için komisyon, ücret, vergiler ve diğer yasal yükümlülükler Müşteriye aittir. Güncel komisyon tarifesi Banka kanallarında yayımlanır ve değişiklikler yayınlandığı tarihten itibaren yürürlüğe girer. Hesap işletim ücreti, saklama ücreti, takas ve borsa ücretleri ile üçüncü taraf masrafları Müşteri hesabından tahsil edilir. Müşteri, hesap bakiyesinin ücret ve masrafları karşılamaya yetmediği durumlarda doğacak borcu ödemeyi kabul eder.

MADDE 6 – RİSK BİLDİRİMİ VE UYGUNLUK
Sermaye piyasası işlemleri değer kaybı riski içerir. Piyasa riski, karşı taraf riski, likidite riski ve kaldıraç etkisi gibi unsurlar Müşteri aleyhine sonuç doğurabilir. Geçmiş performans gelecekteki getirilerin garantisi değildir. Müşteri, yatırım ürünlerinin risk ve getiri profiline uygunluğunu kendi mali durumu ve risk tercihleri çerçevesinde değerlendirmekle yükümlüdür. Banka, yatırım danışmanlığı hizmeti sunmadıkça verilen bilgiler genel niteliktedir.

MADDE 7 – TEMİNAT, KREDİLİ İŞLEM VE AÇIĞA SATIŞ
Kredili işlem veya açığa satış gibi teminat gerektiren işlemler, ayrı sözleşme ve ilave teminat hükümlerine tabidir. Teminatların türü, değerlemesi, tamamlama çağrısı ve eksik teminat halinde pozisyon kapatma kuralları ilgili düzenlemelere göre uygulanır. Müşteri, teminat değerlerindeki düşüşte Bankanın pozisyon kapatma yetkisini kabul eder.

MADDE 8 – SAKLAMA, TAKAS VE KAYDİLEŞTİRME
Sermaye piyasası araçlarının saklaması, Merkezi Kayıt Kuruluşu ve yetkili kuruluşlar nezdinde ilgili mevzuat uyarınca gerçekleştirilir. Temettü, faiz ve anapara ödemeleri ile bedelli veya bedelsiz sermaye artırımlarından doğan haklar, Müşterinin talimatına ve ödeme takvimine bağlı olarak işlenir. Takas ve mutabakat işlemlerinde oluşabilecek gecikmelerden doğan sınırlı sorumluluklar mevzuat çerçevesindedir.

MADDE 9 – BİLDİRİMLER, KAYITLAR VE İLETİŞİM
Müşteriye ait hesap ekstreleri, işlem onayları ve bildirimler elektronik ortamda iletilir. Dijital kanallarda görüntülenen bilgi ve kayıtlar Banka kayıtlarıyla uyumludur. Müşteri, iletişim bilgilerinin güncel olmaması nedeniyle bildirimlerin kendisine ulaşmamasından kaynaklanan sonuçlardan sorumludur. Telefon görüşmeleri ve dijital işlemler güvenlik ve ispat amacıyla kaydedilebilir.

MADDE 10 – KİŞİSEL VERİLER VE GİZLİLİK
Müşterinin kişisel verileri, 6698 sayılı Kişisel Verilerin Korunması Kanunu ve ilgili mevzuat kapsamında işlenir. Aydınlatma metni ve açık rıza gerektiren haller Banka kanallarında sunulur. Banka sırrı ve müşteri sırrı gizliliğine ilişkin yükümlülükler saklıdır. Üçüncü taraf hizmet sağlayıcılarla zorunlu paylaşım, yalnızca mevzuat ve sözleşme kapsamında yapılır.

MADDE 11 – GÜVENLİK, YETKİLENDİRME VE SORUMLULUK
Müşteri, kullanıcı adı, parola, iki faktörlü doğrulama kodları ve benzeri güvenlik unsurlarını korumakla yükümlüdür. Cihaz güvenliği, ağ güvenliği ve güncellemelerin yapılmaması nedeniyle doğabilecek yetkisiz işlemlerden Müşteri sorumludur. Banka, makul güvenlik önlemlerini uygular; ancak Müşteri kaynaklı ihlallerden doğan zarardan sorumlu değildir.

MADDE 12 – VERGİLENDİRME VE YASAL YÜKÜMLÜLÜKLER
Yatırım işlemlerinden doğan vergi, harç ve benzeri mali yükümlülüklerin tespiti ve ödenmesi Müşteriye aittir. Banka, mevzuat gereği tevkifat, raporlama ve bildirimleri yerine getirebilir. Müşteri, vergi statüsündeki değişiklikleri derhal Bankaya bildirir.

MADDE 13 – SÖZLEŞMEDE DEĞİŞİKLİK VE BİLDİRİM
Banka, hizmet koşulları ve tarifelerde değişiklik yapabilir. Değişiklikler, Banka kanallarında duyurulması veya Müşteriye bildirilmesi ile yürürlüğe girer. Müşterinin hizmeti kullanmaya devam etmesi, değişikliklerin kabulü anlamına gelir. Esaslı değişikliklerde Müşteri, makul süre içinde sözleşmeyi feshetme hakkına sahiptir.

MADDE 14 – FESİH, HESABIN KAPATILMASI VE ARTIK BAKİYE
Taraflar, mevzuata uygun şekilde ihbarsız veya ihbarlı fesih hakkını kullanabilir. Müşteri, hesabın kapatılmasını talep ettiğinde, açık pozisyonların kapatılması ve borçların tasfiyesi sonrası kalan bakiyenin iade edilmesini isteyebilir. Kara para aklamanın önlenmesi ve yaptırımlar kapsamında Banka, gerekli gördüğü hallerde hesabı dondurma veya kapatma yetkisine sahiptir.

MADDE 15 – SORUMLULUĞUN SINIRLANDIRILMASI
Banka, mücbir sebep, piyasa kesintisi, telekomünikasyon arızası, borsa ve takas kurumlarının kısıtlamaları gibi kontrolü dışındaki nedenlerle hizmetlerin aksaması halinde sorumlu tutulamaz. Dolaylı zararlar, kar kaybı ve itibar kaybı talepleri kapsam dışıdır.

MADDE 16 – UYUŞMAZLIKLARIN ÇÖZÜMÜ VE YETKİ
Taraflar arasında çıkabilecek uyuşmazlıkların çözümünde öncelikle uzlaşma esastır. Mutabakat sağlanamaması halinde, İstanbul Merkez Mahkemeleri ve İcra Daireleri yetkilidir. Tüketici sıfatına haiz Müşteriler, hakem heyeti ve tüketici mahkemesi başvuru yollarını kullanabilir.

MADDE 17 – YÜRÜRLÜK VE KABUL
Müşteri, bu sözleşmeyi elektronik ortamda onaylamakla hükümlerini okuduğunu, anladığını ve kabul ettiğini beyan eder. Sözleşme, onaylandığı tarihte yürürlüğe girer ve taraflardan birinin fesih bildirimine kadar yürürlükte kalır. Sözleşmenin güncel hali Banka kanallarında yayımlanır.

İşbu sözleşme, ${new Date().toLocaleDateString('tr-TR')} tarihinde elektronik ortamda onaylanmıştır.
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
        scrollEventThrottle={16}
        onScroll={({ nativeEvent }) => {
          const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;
          const paddingToBottom = 24;
          if (contentOffset.y + layoutMeasurement.height >= contentSize.height - paddingToBottom) {
            setHasReadToEnd(true);
          }
        }}
      >
        <Text style={styles.sozlesmeText}>{sozlesmeMetni}</Text>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Kabul / Reddet Footer */}
      <View style={styles.footerBar}>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={() => {
            Alert.alert('Bilgilendirme', 'Sözleşmeyi kabul etmediniz.');
            navigation.goBack();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.declineText}>Kabul Etmiyorum</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.acceptButton, !hasReadToEnd && styles.acceptButtonDisabled]}
          disabled={!hasReadToEnd}
          onPress={() => {
            Alert.alert('Teşekkürler', 'Sözleşmeyi kabul ettiniz.');
            navigation.goBack();
          }}
          activeOpacity={0.8}
        >
          <Text style={[styles.acceptText, !hasReadToEnd && styles.acceptTextDisabled]}>Kabul Ediyorum</Text>
        </TouchableOpacity>
      </View>

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
  scrollContent: { paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 140 },
  sozlesmeText: { fontSize: 14, lineHeight: 24, color: '#333333', textAlign: 'justify' },
  bottomSpacer: { height: 20 },
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
  footerBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  declineButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  declineText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: '#900C3F',
  },
  acceptButtonDisabled: {
    backgroundColor: '#C9A2AF',
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  acceptTextDisabled: {
    color: '#F3E8EC',
  },
});

export default YatirimHesabiScreen;
