import { createI18n } from 'vue-i18n'
import languages from '../../../locales/languages.json'

const localeFiles = import.meta.glob('../../../locales/!(languages).json', { eager: true })

const messages = {}
const availableLocales = []

for (const path in localeFiles) {
  const key = path.match(/\/([^/]+)\.json$/)[1]
  if (languages[key]) {
    messages[key] = localeFiles[path].default
    availableLocales.push({ key, label: languages[key].label })
  }
}

// Default UI language: Russian (migrate previous Chinese default once)
if (!localStorage.getItem('locale_migrated_ru') && localStorage.getItem('locale') === 'zh') {
  localStorage.setItem('locale', 'ru')
  localStorage.setItem('locale_migrated_ru', '1')
}
const savedLocale = localStorage.getItem('locale')
const locale = savedLocale && messages[savedLocale] ? savedLocale : 'ru'
if (!savedLocale || !messages[savedLocale]) {
  localStorage.setItem('locale', 'ru')
}

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages
})

export { availableLocales }
export default i18n
