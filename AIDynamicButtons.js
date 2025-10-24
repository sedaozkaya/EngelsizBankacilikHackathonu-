import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ACTIONS_API_URL } from '@env';

// AI Dynamic Buttons component
// Contract
// - Inputs: none (uses internal mockProfile state)
// - Behavior: Prepares lastFiveTransactions based on mockProfile and fetches suggested actions from API (or mock fallback)
// - Output UI: Title, profile selection chips, dynamic action buttons; loading and error states

const AIDynamicButtons = ({ onActionPress }) => {
  const [mockProfile, setMockProfile] = useState('Ödeme Odaklı'); // or 'Yatırımcı'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actions, setActions] = useState([]);
  const [aiRationale, setAiRationale] = useState('');

  // Prepare last five transactions as example text per profile
  const lastFiveTransactions = useMemo(() => {
    if (mockProfile === 'Yatırımcı') {
      return [
        'Borsa: ABC Hisse Alımı - 2.500 TL',
        'Fon: ABC B Tipi Fon Katılma - 1.000 TL',
        'Borsa: XYZ Hisse Satışı - 3.200 TL',
        'Eurobond Kupon Ödemesi - 450 TL',
        'Fon: DEF Esnek Fon Alımı - 750 TL',
      ];
    }
    // Ödeme Odaklı
    return [
      'Elektrik faturası - 350 TL',
      'Su faturası - 120 TL',
      'Mobil hat ödemesi - 245 TL',
      'Kira EFT - 12.500 TL',
      'Market alışverişi - 980 TL',
    ];
  }, [mockProfile]);

  const getMockData = (profile) => {
    if (profile === 'Yatırımcı') {
      return {
        actions: [
          { id: 'act-1', title: 'Hisse Al/Sat', subtitle: 'Piyasa emirleri', icon: 'trending-up-outline' },
          { id: 'act-2', title: 'Fon İşlemleri', subtitle: 'Alım / Satım', icon: 'pie-chart-outline' },
          { id: 'act-3', title: 'Piyasa Özeti', subtitle: 'Günlük görünüm', icon: 'newspaper-outline' },
          { id: 'act-4', title: 'Risk Profili', subtitle: 'Güncelle', icon: 'shield-checkmark-outline' },
          { id: 'act-5', title: 'Piyasa Alarmı', subtitle: 'Fiyat uyarı', icon: 'notifications-outline' },
        ],
        aiRationale:
          'Son işlemleriniz ağırlıklı olarak sermaye piyasası ürünlerinde. Günlük piyasa özeti ve fon/hisse kısayolları yatırım davranışınızı desteklemek için önerildi.',
      };
    }
    return {
      actions: [
        { id: 'act-1', title: 'Fatura Öde', subtitle: 'Elektrik / Su / GSM', icon: 'receipt-outline' },
        { id: 'act-2', title: 'Para Gönder', subtitle: 'IBAN / Kolay Adres', icon: 'send-outline' },
        { id: 'act-3', title: 'Kira Ödemesi', subtitle: 'Aylık', icon: 'home-outline' },
        { id: 'act-4', title: 'Otomatik Ödeme', subtitle: 'Talimat oluştur', icon: 'calendar-outline' },
        { id: 'act-5', title: 'Hızlı IBAN Paylaş', subtitle: 'Kolay paylaş', icon: 'share-social-outline' },
      ],
      aiRationale:
        'Son beş işleminiz düzenli ödemelere odaklı. Fatura, para transferi ve otomatik talimat kısayolları ödeme rutinlerinizi hızlandırmak için önerildi.',
    };
  };

  const handleFetchActions = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        profile: mockProfile,
        lastFiveTransactions,
      };

  let data;

      if (ACTIONS_API_URL && typeof ACTIONS_API_URL === 'string' && ACTIONS_API_URL.length > 0) {
        const res = await fetch(ACTIONS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error(`API error ${res.status}`);
        }
        data = await res.json();
      } else {
        // Mock fallback: create suggested actions based on profile
        await new Promise((r) => setTimeout(r, 600));
        data = getMockData(mockProfile);
      }

      // Expecting data.actions as array; limit to first 4
      setActions(Array.isArray(data?.actions) ? data.actions.slice(0, 4) : []);
      setAiRationale(typeof data?.aiRationale === 'string' ? data.aiRationale : '');
      setLoading(false);
    } catch (e) {
      // On API failure: show fallback actions and specific rationale message
      const fallback = getMockData(mockProfile);
      setActions(fallback.actions.slice(0, 4));
      setAiRationale('API bağlantısı başarısız oldu, varsayılan öneriler gösteriliyor.');
      setError(e?.message || 'Beklenmeyen bir hata oluştu');
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mockProfile]);

  const renderActionCard = (action) => (
    <TouchableOpacity
      key={action.id}
      style={styles.actionCard}
      onPress={() => onActionPress?.(action)}
      activeOpacity={0.9}
      disabled={loading}
    >
      <View style={styles.actionCardIconCircle}>
        <Ionicons name={action.icon || 'flash-outline'} size={24} color="#A91F5B" />
      </View>
      <Text style={styles.actionCardTitle} numberOfLines={2}>
        {action.title}
      </Text>
      {action.subtitle ? (
        <Text style={styles.actionCardSubtitle} numberOfLines={1}>
          {action.subtitle}
        </Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>AI Dinamik Kısayollar</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={handleFetchActions}
          disabled={loading}
          accessibilityLabel="Yenile"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#A91F5B" />
          ) : (
            <Ionicons name="refresh" size={18} color="#A91F5B" />
          )}
        </TouchableOpacity>
      </View>


      {/* Loading / Error */}
      {error ? (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={18} color="#D97706" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Actions - 2x2 Grid (no ScrollView) */}
      {loading && actions.length === 0 ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color="#A91F5B" />
          <Text style={styles.loadingText}>Öneriler hazırlanıyor…</Text>
        </View>
      ) : actions.length > 0 ? (
        <View style={styles.actionGrid}>
          {actions.map(renderActionCard)}
        </View>
      ) : (
        !loading && <Text style={styles.emptyText}>Henüz öneri bulunamadı.</Text>
      )}

      {/* AI Rationale Panel */}
      {aiRationale ? (
        <View style={styles.aiPanel}>
          <View style={styles.aiPanelHeader}>
            <Ionicons name="sparkles" size={16} color="#FDE68A" />
            <Text style={styles.aiPanelTitle}>Yapay Zeka Analizi</Text>
          </View>
          <Text style={styles.aiPanelText}>{aiRationale}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 16,
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  refreshButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F8F0F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap not fully supported; use margins
    backgroundColor: '#FFF7ED',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  errorText: { color: '#9A3412', fontSize: 12, marginLeft: 6 },
  actionGrid: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loadingRow: { flexDirection: 'row', alignItems: 'center' },
  loadingText: { marginLeft: 10, color: '#6B7280', fontSize: 12 },
  emptyText: { color: '#6B7280', fontSize: 12 },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  actionCardIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F0F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionCardTitle: { fontSize: 12, fontWeight: '700', color: '#111827', textAlign: 'center' },
  actionCardSubtitle: { fontSize: 11, color: '#6B7280', textAlign: 'center', marginTop: 2 },

  aiPanel: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  aiPanelHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  aiPanelTitle: { color: '#F9FAFB', fontWeight: '700', marginLeft: 6 },
  aiPanelText: { color: '#E5E7EB', fontSize: 12, lineHeight: 18 },
});

export default AIDynamicButtons;
