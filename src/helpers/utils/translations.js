const template = require('./template')

const t = (lang) => {
  var dictionary

  try {
    dictionary = require('../../data/' + lang + '/ui')
  } catch (e) {
    dictionary = require('../../data/en/ui')
  }

  return (key, parameters) => {
    if (dictionary[key]) {
      return template(dictionary[key], parameters)
    }

    console.log('Missing translation for ‘' + key + '’ in locale ‘' + lang + '’.')
    return key
  }
}

module.exports = t
