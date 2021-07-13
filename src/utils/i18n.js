import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";

import en from "./locales/en";

import es from "./locales/es";

import ja from "./locales/ja";

const locales = RNLocalize.getLocales();
console.log('locales:')
console.log(locales)

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
  console.log('idioma: '+I18n.locale)
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  es,
  ja
};

export default I18n;