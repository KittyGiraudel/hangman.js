const { getCurrentWord, getTriedLetters } = require('../store/connect')

const getNotTriedLetters = () => {
  return 'abcdefghijklmnopqrstuvwxyz'.split('')
    .filter(hasLetterNotBeenTried)
}

const getLettersFromWord = () => {
  return getCurrentWord().split('')
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
  getNotTriedLetters,
  hasWordLetter,
  hasLetterBeenTried,
  getCurrentWordStatus
}
