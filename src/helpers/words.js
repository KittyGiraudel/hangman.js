const { getLocale } = require('../store/connect')
const translations = require('./utils/translations')

const t = (key, parameters) => {
  return translations(getLocale())(key, parameters)
}

module.exports = { t }
