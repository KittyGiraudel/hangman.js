const { DEFAULT_LANGUAGE } = require('../../configuration')

const getDictionary = (lang) => {
  try {
    return require('../../data/' + lang + '/words')
  } catch (e) {
    console.log(e)
    return require('../../data/en/words')
  }
}

module.exports = getDictionary
