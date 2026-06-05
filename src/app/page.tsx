import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootPage() {
  const acceptLang = (await headers()).get('accept-language') ?? '';
  redirect(/\bfr\b/i.test(acceptLang) ? '/fr' : '/en');
}
