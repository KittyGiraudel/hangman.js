const template = require('./template')
const LOCALES = {
  'en': require('../../data/en/ui'),
  'fr': require('../../data/fr/ui')
}

const t = (lang) => {
  const dictionary = LOCALES[lang]

  return (key, parameters) => {
    if (dictionary[key]) {
      return template(dictionary[key], parameters)
    }

    console.log('Missing translation for ‘' + key + '’ in locale ‘' + lang + '’.')
    return key
  }
}

module.exports = t
