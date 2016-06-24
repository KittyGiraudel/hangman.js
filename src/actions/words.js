const getWord = (word) => ({
  type: 'GET_WORD'
})

const setLanguage = (language) => ({
  type: 'SET_LANGUAGE',
  value: language
})

module.exports = {
  getWord,
  setLanguage
}
