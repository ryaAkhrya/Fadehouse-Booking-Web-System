import { cookies } from 'next/headers'
import { en, id } from './dictionaries'

export async function getDictionary() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en'
  return {
    lang: lang as 'en' | 'id',
    t: lang === 'id' ? id : en
  }
}
