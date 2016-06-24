const { getState } = require('../store')
const { getLettersFromWord, hasLetterBeenTried } = require('./letters')
const { getTriesLeft } = require('./tries')

const isOver = () => {
  return isWon() || isLost()
}

const isRunning = () => {
  return getState().game.isPlaying === true
}

const isWon = () => {
  return getLettersFromWord().every(hasLetterBeenTried)
}

const isLost = () => {
  return getTriesLeft() === 0
}

module.exports = {
  isOver,
  isRunning,
  isWon,
  isLost
}
