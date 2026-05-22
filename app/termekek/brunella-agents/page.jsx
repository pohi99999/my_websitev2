import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function BrunellaAgentsRedirect() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const target = language === 'hu' ? '/portfolio/brunella-bas' : `/${language}/portfolio/brunella-bas`;
  redirect(target);
}
