'use strict'

const { isPlaying } = require('./actions/game')
const { tryLetter, resetLetters } = require('./actions/letters')
const { resetTries, incrementTries, setMaxTries } = require('./actions/tries')
const { getWord, setLanguage } = require('./actions/words')

const { DEFAULT_MAX_TRIES, DEFAULT_LANGUAGE } = require('./configuration')
const translations = require('./helpers/translations')
const store = require('./store')

// Helpers…

const s = () => {
  return store.getState()
}

const t = (key, parameters) => {
  const locale = s().words.lang
  const getTranslation = translations(locale)
  return getTranslation(key, parameters)
}

// Is…

const isGameRunning = () => {
  return s().game.isPlaying === true
}

const isOver = () => {
  return hasWon() || hasLost()
}

// Has…

const hasWon = () => {
  return getLettersFromWord().every(hasLetterBeenTried)
}

const hasLost = () => {
  return getTriesLeft() === 0
}

const hasWordLetter = (letter) => {
  return getLettersFromWord().indexOf(letter) > -1
}

const hasLetterBeenTried = (letter) => {
  return getTriedLetters().indexOf(letter) > -1
}

// Get…

const getSolution = () => {
  return s().words.word
}

const getLettersFromWord = () => {
  return getSolution().split('')
}

const getTriedLetters = (letter) => {
  return s().letters
}

const getTriesLeft = () => {
  return s().tries.max - s().tries.count
}

const getCurrentWordStatus = () => {
  return getLettersFromWord()
    .map((letter) => hasLetterBeenTried(letter) ? letter : '_')
    .join(' ')
}

// Display…

const displayCurrentRound = function (letter, hasBeenTried) {
  const message = hasBeenTried
    ? t('tried_letter', { letter })
    : t('try_letter', { letter })

  this.log('')
  this.log(message)
}

const displayGameStatus = function () {
  const word = getSolution()
  const tries = getTriesLeft()
  const message = hasLost()
    ? t('defeat', { word })
    : hasWon()
      ? t('win', { word })
      : t('tries_left', { tries })

  this.log(getCurrentWordStatus())
  this.log('')
  this.log(message)
  this.log('')
}

// Actions…

const startGame = function (options) {
  store.dispatch(setLanguage(options.lang))
  store.dispatch(setMaxTries(options.tries))
  store.dispatch(isPlaying(true))
  store.dispatch(getWord())
  store.dispatch(resetTries())
  store.dispatch(resetLetters())
}

const playRound = function (letter) {
  const hasBeenTried = hasLetterBeenTried(letter)

  store.dispatch(tryLetter(letter))

  if (!hasBeenTried && !hasWordLetter(letter)) {
    store.dispatch(incrementTries())
  }

  displayCurrentRound.call(this, letter, hasBeenTried)
  displayGameStatus.call(this)
}

const execStartCmd = function (args, callback) {
  const tries = args.options.tries || DEFAULT_MAX_TRIES
  const lang = args.options.lang || DEFAULT_LANGUAGE

  startGame({ tries, lang })
  displayGameStatus.call(this)
  callback()
}

const execTryCmd = function (args, callback) {
  if (!isGameRunning()) {
    this.log(t('argument_game_not_running'))
    this.log('')
    return callback()
  }

  playRound.call(this, args.letter)

  if (isOver()) {
    store.dispatch(isPlaying(false))
  }

  callback()
}

const execLettersCmd = function (args, callback) {
  const letters = getTriedLetters().join(', ')

  if (!isGameRunning()) {
    this.log(t('argument_game_not_running'))
    this.log('')
    return callback()
  }

  this.log('')
  this.log(t('tried_letters', { letters }))
  this.log('')

  callback()
}

module.exports = {
  execLettersCmd,
  execTryCmd,
  execStartCmd
}
