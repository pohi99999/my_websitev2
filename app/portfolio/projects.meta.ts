export type PortfolioProjectMeta = {
  id: string;
  title: string;
  emoji: string;
  industry?: string;
  description?: string;
};

export const PORTFOLIO_PROJECT_META: Record<string, PortfolioProjectMeta> = {
  '1': {
    id: '1',
    title: 'E-commerce AI Személyesítési Platform',
    emoji: '🛍️',
    industry: 'E-commerce',
    description:
      'Képi felismerésre és gépi tanulásra alapuló ajánlási motor, amely az e-kereskedelmi platform konverziós rátáját 35%-kal növelte.'
  },
  '2': {
    id: '2',
    title: 'Felhő Migrációs Projekt',
    emoji: '☁️',
    industry: 'Pénzügyek',
    description: 'Teljes infrastruktúra migrálás on-premise szervereikről az AWS-re, nulla downtime-mel és 40% költségmegtakarítással.'
  },
  '3': {
    id: '3',
    title: 'AI Chatbot Platform',
    emoji: '🤖',
    industry: 'Ügyfélszolgálat',
    description: 'Multilingvális AI chatbot 24/7 támogatáshoz, amely 60% csökkentést eredményezett az ügyfélszolgálati költségekben.'
  }
};

export function getPortfolioProjectMeta(id: string): PortfolioProjectMeta | undefined {
  return PORTFOLIO_PROJECT_META[id];
}
