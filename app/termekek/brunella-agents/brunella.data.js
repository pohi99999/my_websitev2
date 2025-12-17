import React from 'react';
import { Brain, Zap, Gauge, Link2, Bot, BarChart3, CheckCircle } from 'lucide-react';

export const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Autonóm Ágensek',
    description: 'Önállóan működő mesterséges intelligencia ügynökök.'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Valós Idejű Döntéshozatal',
    description: 'Azonnali reagálás és intelligens válaszadás.'
  },
  {
    icon: <Gauge className="w-8 h-8" />,
    title: 'Teljesítményelemzés',
    description: 'Részletes elemzés és hatékonyság nyomon követése.'
  },
  {
    icon: <Link2 className="w-8 h-8" />,
    title: 'API Integráció',
    description: 'Zökkenőmentes csatlakozás külső rendszerekhez.'
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: 'Ügynök Framework',
    description: 'Fejlesztőbarát framework az egyéni ágensek kódolásához.'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Monitorozás & Analytics',
    description: 'Teljes ellenőrzés és adatelemzés a felhőben.'
  }
];

export const useCases = [
  {
    title: 'Üzleti Folyamatok Automatizálása',
    description: 'Böngészést, adatgyűjtést és műveletek automatizálása végig a munkafolyamatokon.'
  },
  {
    title: 'Ügyfélszolgálat Automatizáció',
    description: 'Intelligens chatbotok, amely képes összetett feladatok megoldására.'
  },
  {
    title: 'Adatgyűjtés és Keresés',
    description: 'Webes adatgyűjtés, versenytárs monitorozás és piacelemzés.'
  },
  {
    title: 'Prediktív Karbantartás',
    description: 'Gépipar és logisztika: előrejelzések alapján karbantartási ütemezés.'
  },
  {
    title: 'Személyre Szabott Marketing',
    description: 'Ügyfélsegmentáció és kampányoptimalizálás automatikusan.'
  },
  {
    title: 'Kutatás és Fejlesztés',
    description: 'Automatikus kutatás, adatbázis-keresés és dokumentumfeldolgozás.'
  }
];

export const plans = [
  {
    name: 'Team',
    price: '$299',
    period: '/hó',
    description: 'Kis csapatoknak és startupoknak',
    features: [
      '5 egyéni ágensek',
      'Korlátlan API hívások',
      'Email és chat támogatás',
      'Alapvető analytics',
      'Közösségi fórum hozzáférés'
    ]
  },
  {
    name: 'Business',
    price: '$999',
    period: '/hó',
    description: 'Középnagy vállalatok',
    features: [
      '50+ ügynökök',
      'Korlátlan API hívások',
      'Prioritás támogatás',
      'Fejlett analytics és reporting',
      'Testreszabott ágensek fejlesztése',
      'Dedikált account manager'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Egyedi',
    period: '',
    description: 'Nagyvállalati megoldások',
    features: [
      'Korlátlan ügynökök',
      'Dedikált szerver/felhő',
      '24/7 telefonos támogatás',
      'On-premise lehetőség',
      'Custom AI modellek',
      'SLA garancia'
    ]
  }
];

// Re-exported for convenience if other modules need it.
export { CheckCircle };
