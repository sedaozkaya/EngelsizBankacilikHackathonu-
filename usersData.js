// Mock customer data based on Müşteri Bilgileri.xlsx
const CUSTOMER_DATA = [
  {
    id: 'AY',
    name: 'Ahmet Yılmaz',
    initials: 'AY',
    details: {
      Meslek: 'Yazılım Mühendisi',
      EvSahibi: 'Evet',
      KrediKullanmış: 'Hayır',
      Son30Islem:
        'Yatırım Fonu Alış, Havale, EFT, Fatura Ödeme, Yatırım Fonu Alış, Döviz Alış, Havale, Yatırım Fonu Alış, Fatura Ödeme, Kira Ödemesi, EFT, Yatırım Fonu Alış, Döviz Satış, Havale, Yatırım Fonu Alış, Fatura Ödeme, Havale, EFT, Yatırım Fonu Alış, Döviz Alış, Havale, Fatura Ödeme, EFT, Yatırım Fonu Alış, Havale, Kredi Kartı Ödeme, EFT, Yatırım Fonu Alış, Döviz Alış, Havale',
    },
  },
  {
    id: 'EK',
    name: 'Elif Kaya',
    initials: 'EK',
    details: {
      Meslek: 'Öğretmen',
      EvSahibi: 'Hayır',
      KrediKullanmış: 'Evet',
      Son30Islem:
        'Kredi Ödeme, Fatura Ödeme, Kira Ödemesi, Kredi Ödeme, Kredi Ödeme, Kredi Ödeme, Fatura Ödeme, Havale, EFT, Kredi Ödeme, Fatura Ödeme, Kira Ödemesi, Kredi Ödeme, Havale, Fatura Ödeme, Kredi Ödeme, Kira Ödemesi, Fatura Ödeme, EFT, Kredi Ödeme, Kredi Ödeme, Fatura Ödeme, EFT, Havale, Kredi Ödeme, Kredi Ödeme, EFT, Fatura Ödeme, Kira Ödemesi, EFT',
    },
  },
  {
    id: 'ZD',
    name: 'Zeynep Demir',
    initials: 'ZD',
    details: {
      Meslek: 'Finans Uzmanı',
      EvSahibi: 'Hayır',
      KrediKullanmış: 'Evet',
      Son30Islem:
        'Hisse Senedi Alış, Hisse Senedi Satış, Döviz Alış, Döviz Satış, EFT, Hisse Senedi Alış, Kripto Para Alış, Döviz Satış, Havale, Hisse Senedi Satış, EFT, Döviz Alış, Hisse Senedi Alış, Hisse Senedi Satış, Kripto Para Satış, EFT, Döviz Alış, Hisse Senedi Alış, Havale, Döviz Satış, Hisse Senedi Satış, Kripto Para Alış, EFT, Hisse Senedi Alış, Döviz Alış, Kredi Kartı Ödeme, Hisse Senedi Satış, Döviz Satış, Havale, EFT',
    },
  },
];

export default CUSTOMER_DATA;
