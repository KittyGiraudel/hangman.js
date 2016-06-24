const { getState } = require('../store')
const { getSolution } = require('./words')

const getTriedLetters = (letter) => {
  return getState().letters
}

const getLettersFromWord = () => {
  return getSolution().split('')
}

const hasWordLetter = (letter) => {
  return getLettersFromWord().indexOf(letter) > -1
}

const hasLetterBeenTried = (letter) => {
  return getTriedLetters().indexOf(letter) > -1
}

const getCurrentWordStatus = () => {
  return getLettersFromWord()
    .map((letter) => hasLetterBeenTried(letter) ? letter : '_')
    .join(' ')
}

module.exports = {
  getLettersFromWord,
  getTriedLetters,
  hasWordLetter,
  hasLetterBeenTried,
  getCurrentWordStatus
}
