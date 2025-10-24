import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OPENAI_API_KEY, OPENAI_API_ENDPOINT, OPENAI_API_VERSION, OPENAI_DEPLOYMENT_NAME } from '@env';

// AI Dynamic Buttons component
// Contract
// - Inputs: selectedUser (object with id, name, initials, details)
// - Behavior: Uses selectedUser details to build AI prompt and fetch actions
// - Output UI: Title, 2x2 grid of dynamic action buttons, AI rationale panel

const AIDynamicButtons = ({ selectedUser, onActionPress }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actions, setActions] = useState([]);
  const [aiRationale, setAiRationale] = useState('');

  const getMockData = (userDetails) => {
    // Determine profile from transaction history
    const transactions = userDetails.Son30Islem || '';
    const isInvestor = transactions.toLowerCase().includes('yatırım') || transactions.toLowerCase().includes('fon');
    
    if (isInvestor) {
      return {
        actions: [
          { id: 'act-1', title: 'Hisse Al/Sat', icon: 'trending-up-outline' },
          { id: 'act-2', title: 'Fon İşlemleri', icon: 'pie-chart-outline' },
          { id: 'act-3', title: 'Piyasa Özeti', icon: 'newspaper-outline' },
          { id: 'act-4', title: 'Risk Profili', icon: 'shield-checkmark-outline' },
        ],
        aiRationale: `${userDetails.Meslek} olarak çalışan kullanıcımızın son işlemlerinde yatırım ağırlıklı. Yatırım araçlarına yönelik kısayollar önerildi.`,
      };
    }
    return {
      actions: [
        { id: 'act-1', title: 'Fatura Öde', icon: 'receipt-outline' },
        { id: 'act-2', title: 'Para Gönder', icon: 'send-outline' },
        { id: 'act-3', title: 'Kira Ödemesi', icon: 'home-outline' },
        { id: 'act-4', title: 'Kredi Ödemesi', icon: 'cash-outline' },
      ],
      aiRationale: `${userDetails.Meslek} olarak çalışan kullanıcımızın düzenli ödeme işlemleri odaklı. Fatura ve kredi ödeme kısayolları önerildi.`,
    };
  };

  const handleFetchActions = async () => {
    if (!selectedUser || !selectedUser.details) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const userDetails = selectedUser.details;
      const now = new Date();
      const timeInfo = `Saat: ${now.getHours()}:${now.getMinutes()}, Gün: ${now.toLocaleDateString('tr-TR', { weekday: 'long' })}`;

      const gptPrompt = `Sen bir bankacılık asistanısınız. Aşağıdaki kullanıcı bilgilerine göre 4 adet dinamik kısayol öner (JSON formatında).

Kullanıcı Detayları:
- Meslek: ${userDetails.Meslek}
- Ev Sahibi: ${userDetails.EvSahibi}
- Kredi Kullanmış: ${userDetails.KrediKullanmış}
- Son 30 İşlem: ${userDetails.Son30Islem}
- Zaman Bilgisi: ${timeInfo}

Lütfen aşağıdaki JSON formatında 4 eylem ve bir gerekçe (aiRationale) döndür:
{
  "actions": [
    {"id": "act-1", "title": "Eylem Başlık", "icon": "ionicons-ismi"},
    ...
  ],
  "aiRationale": "Kullanıcının işlem geçmişine göre açıklama metni"
}`;

      let data;

      const deploymentName = OPENAI_DEPLOYMENT_NAME || 'contrat-summarizer';
      const baseEndpoint = OPENAI_API_ENDPOINT?.endsWith('/')
        ? OPENAI_API_ENDPOINT.slice(0, -1)
        : OPENAI_API_ENDPOINT;

      if (baseEndpoint && OPENAI_API_KEY) {
        const apiUrl = `${baseEndpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${OPENAI_API_VERSION}`;

        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': OPENAI_API_KEY,
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: 'Sen bir bankacılık uzmanısın ve kullanıcılara kişiselleştirilmiş öneriler sunuyorsun.' },
              { role: 'user', content: gptPrompt },
            ],
            max_tokens: 800,
            temperature: 0.7,
          }),
        });

        if (!res.ok) {
          throw new Error(`API error ${res.status}`);
        }

        const apiData = await res.json();
        let content = apiData.choices[0]?.message?.content || '{}';
        
        // Clean the content from markdown code blocks and extra characters
        content = content.trim();
        // Remove markdown code blocks if present
        if (content.startsWith('```json')) {
          content = content.replace(/^```json\s*\n?/, '').replace(/\n?```\s*$/, '');
        } else if (content.startsWith('```')) {
          content = content.replace(/^```\s*\n?/, '').replace(/\n?```\s*$/, '');
        }
        content = content.trim();
        
        // Try to parse JSON from the model output. Be defensive: the model
        // may return plain text or include surrounding markdown. Attempt a
        // direct parse first, then try to extract a JSON substring.
        let parsed = null;
        try {
          parsed = JSON.parse(content);
        } catch (parseErr) {
          // Try to extract the first JSON object in the text
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              parsed = JSON.parse(jsonMatch[0]);
            } catch (e2) {
              parsed = null;
            }
          }
        }

        if (!parsed) {
          throw new Error('Model yanıtı JSON formatında değil veya parse edilemedi');
        }

        data = parsed;
      } else {
        // Mock fallback
        await new Promise((r) => setTimeout(r, 600));
        data = getMockData(userDetails);
      }

      // Limit to first 4
      setActions(Array.isArray(data?.actions) ? data.actions.slice(0, 4) : []);
      setAiRationale(typeof data?.aiRationale === 'string' ? data.aiRationale : '');
      setLoading(false);
    } catch (e) {
      // On API failure: show fallback actions
      const fallback = getMockData(selectedUser.details);
      setActions(fallback.actions.slice(0, 4));
      setAiRationale('API bağlantısı başarısız oldu, varsayılan öneriler gösteriliyor.');
      setError(e?.message || 'Beklenmeyen bir hata oluştu');
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

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
