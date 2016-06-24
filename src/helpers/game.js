const { isPlaying } = require('../actions/game')
const { tryLetter, resetLetters } = require('../actions/letters')
const { resetTries, incrementTries, setMaxTries } = require('../actions/tries')
const { getWord, setLanguage } = require('../actions/words')
const { getState, dispatch } = require('../store')
const { getLettersFromWord, hasLetterBeenTried, hasWordLetter } = require('./letters')
const { getTriesLeft } = require('../store/connect')

const startGame = (options) => {
  dispatch(setLanguage(options.lang))
  dispatch(setMaxTries(options.tries))
  dispatch(isPlaying(true))
  dispatch(getWord())
  dispatch(resetTries())
  dispatch(resetLetters())
}

const playRound = function (letter) {
  const hasBeenTried = hasLetterBeenTried(letter)
  const shouldIncrementTries = (
    !hasBeenTried &&
    !hasWordLetter(letter)
  )

  dispatch(tryLetter(letter))

  if (shouldIncrementTries) {
    dispatch(incrementTries())
  }

  return hasBeenTried
}

const isWon = () => {
  return getLettersFromWord().every(hasLetterBeenTried)
}

const isLost = () => {
  return getTriesLeft() === 0
}

const isOver = () => {
  return isWon() || isLost()
}

const stopGame = () => {
  dispatch(isPlaying(false))
}

module.exports = {
  startGame,
  stopGame,
  playRound,
  isOver,
  isWon,
  isLost
}
