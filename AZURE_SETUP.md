# Azure OpenAI Deployment Kurulumu

## Sorun

`DeploymentNotFound` hatası alıyorsanız, Azure OpenAI portalınızda henüz bir model deployment'ı oluşturmamışsınız demektir.

## Çözüm Adımları

### 1. Azure Portal'a Giriş Yapın

- https://portal.azure.com adresine gidin
- Hesabınızla giriş yapın

### 2. OpenAI Resource'unuzu Bulun

- Sol menüden "All resources" veya "Azure OpenAI" seçin
- `team7-5462-resource` adlı resource'unuzu bulun ve tıklayın

### 3. Model Deployment Oluşturun

- Sol menüden **"Model deployments"** seçeneğine tıklayın
- **"Manage Deployments"** veya **"Create"** butonuna tıklayın
- Açılan sayfada **"+ Create new deployment"** seçin

### 4. Deployment Ayarları

Aşağıdaki bilgileri girin:

- **Model**: `gpt-4`, `gpt-4-turbo`, `gpt-35-turbo` veya `gpt-4o` seçin
- **Deployment name**: `gpt-4` (veya tercih ettiğiniz bir isim)
- **Model version**: En güncel versiyonu seçin
- **Deployment type**: Standard
- **Tokens per Minute Rate Limit**: 10K (veya planınıza göre)

**ÖNEMLİ**: Deployment name'i `.env` dosyanızdaki `OPENAI_DEPLOYMENT_NAME` ile aynı yapın!

### 5. Deployment'ı Onaylayın

- **"Create"** butonuna tıklayın
- Deployment'ın oluşması 2-5 dakika sürebilir
- Durum **"Succeeded"** olduğunda kullanıma hazırdır

### 6. .env Dosyanızı Güncelleyin

Deployment name'inizi `.env` dosyasına ekleyin:

```env
OPENAI_DEPLOYMENT_NAME=gpt-4
```

**Not**: Eğer farklı bir deployment adı kullandıysanız (örn: `gpt-35-turbo`, `my-gpt4`), o adı yazın.

### 7. Uygulamayı Yeniden Başlatın

```bash
# Expo'yu yeniden başlatın
npx expo start
# Veya terminalde 'r' tuşuna basarak reload edin
```

## Deployment Name Örnekleri

Azure Portal'da şu deployment isimlerinden birini kullanabilirsiniz:

- `gpt-4`
- `gpt-4-turbo`
- `gpt-35-turbo`
- `gpt-4o`
- `gpt-4o-mini`

## Deployment Kontrolü

Deployment'ınızı kontrol etmek için:

1. Azure Portal → Your OpenAI Resource
2. Sol menüden "Model deployments"
3. Listelenen deployment'ları görün
4. Deployment adını kopyalayın ve `.env` dosyasına yapıştırın

## Hala Sorun mu Yaşıyorsunuz?

Aşağıdaki komutla API'nizin çalıştığını test edin:

```bash
curl -X POST "https://team7-5462-resource.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview" \
  -H "Content-Type: application/json" \
  -H "api-key: YOUR_API_KEY" \
  -d '{
    "messages": [{"role": "user", "content": "Merhaba"}],
    "max_tokens": 10
  }'
```

Başarılı yanıt alırsanız, deployment doğru çalışıyor demektir.

## Yardım

Sorun devam ederse:

- Azure Portal'daki deployment durumunu kontrol edin
- API Key'in doğru olduğundan emin olun
- Endpoint URL'sinin sonunda `/` olmadığından emin olun
- Deployment adının tam olarak eşleştiğinden emin olun
