import 'server-only'
 
const dictionaries: Record<string, Function> = {
  en: () => import('./locales/en.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string) => dictionaries[locale]?.() ?? dictionaries.en()