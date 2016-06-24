const { getState } = require('../store')
const translations = require('./utils/translations')

const getSolution = () => {
  return getState().words.word
}

const t = (key, parameters) => {
  const locale = getState().words.lang
  return translations(locale)(key, parameters)
}

module.exports = {
  getSolution,
  t
}
