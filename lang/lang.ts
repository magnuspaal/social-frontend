import 'server-only'
 
const dictionaries: Record<string, Function> = {
  en: () => import('./locales/en.json').then((module) => module.default),
  et: () => import('./locales/et.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string) => {
  return dictionaries[locale]?.() ?? dictionaries.en()
}