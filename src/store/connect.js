const { getState } = require('./')

const getCurrentWord = () => {
  return getState().words.word
}

const getTriedLetters = () => {
  return getState().letters
}

const getTries = () => {
  return getState().tries.count
}

const isRunning = () => {
  return getState().game.isPlaying === true
}

const getTriesLeft = () => {
  return getState().tries.max - getTries()
}

const getLocale = () => {
  return getState().words.lang
}

module.exports = {
  getCurrentWord,
  getTriedLetters,
  getTriesLeft,
  getTries,
  isRunning,
  getLocale
}
