const { DEFAULT_LANGUAGE } = require('../configuration')
const getDictionary = require('../helpers/utils/getDictionary')
const arrayRandom = require('../helpers/utils/arrayRandom')

const getRandomWord = (lang) => {
  return arrayRandom(getDictionary(lang)).toLowerCase()
}

const initialState = {
  lang: DEFAULT_LANGUAGE,
  word: null
}

function words (state = initialState, action) {
  switch (action.type) {
    case 'GET_WORD':
      return Object.assign({}, state, { word: getRandomWord(state.lang) })
    case 'SET_LANGUAGE':
      return Object.assign({}, state, { lang: action.value })
  }

  return state
}

module.exports = words
