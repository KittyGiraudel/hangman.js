const { DEFAULT_LANGUAGE } = require('../../configuration')
const DICTIONARIES = {
  'en': require('../../data/en/words'),
  'fr': require('../../data/fr/words')
}

const getDictionary = (lang) => {
  return DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LANGUAGE]
}

module.exports = getDictionary
