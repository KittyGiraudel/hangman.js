const { getState } = require('../store')
const { getSolution } = require('./words')

const getTriedLetters = () => {
  return getState().letters
}

const getNotTriedLetters = () => {
  return 'abcdefghijklmnopqrstuvwxyz'.split('').filter(hasLetterNotBeenTried)
}

const getLettersFromWord = () => {
  return getSolution().split('')
}

const hasWordLetter = (letter) => {
  return getLettersFromWord().indexOf(letter) > -1
}

const hasLetterNotBeenTried = (letter) => {
  return !hasLetterBeenTried(letter)
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
  getNotTriedLetters,
  hasWordLetter,
  hasLetterBeenTried,
  getCurrentWordStatus
}
