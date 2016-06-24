'use strict'

const { isPlaying } = require('./actions/game')
const { tryLetter, resetLetters } = require('./actions/letters')
const { resetTries, incrementTries, setMaxTries } = require('./actions/tries')
const { getWord, setLanguage } = require('./actions/words')

const { DEFAULT_MAX_TRIES, DEFAULT_LANGUAGE } = require('./configuration')
const translations = require('./helpers/translations')
const store = require('./store')

// Is…

const isGameRunning = () => {
  return store.getState().game.isPlaying === true
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
  return store.getState().words.word
}

const getLettersFromWord = () => {
  return getSolution().split('')
}

const getTriedLetters = (letter) => {
  return store.getState().letters
}

const getTriesLeft = () => {
  return store.getState().tries.max - store.getState().tries.count
}

const getCurrentWordStatus = () => {
  return getLettersFromWord()
    .map((letter) => hasLetterBeenTried(letter) ? letter : '_')
    .join(' ')
}

const t = (key, parameters) => {
  const locale = store.getState().words.lang
  const getTranslation = translations(locale)
  return getTranslation(key, parameters)
}

// Display…

const displayEmptyLine = function () {
  this.log('')
}

const displayMessage = function (message) {
  this.log(message)
}

const displayCurrentWordStatus = function () {
  this.log(getCurrentWordStatus())
}

const displayCurrentLetter = function (letter, hasBeenTried) {
  const message = hasBeenTried
    ? t('tried_letter', { letter })
    : t('try_letter', { letter })

  displayEmptyLine.call(this)
  displayMessage.call(this, message)
}

const displayEndOfRound = function () {
  const word = getSolution()
  const tries = getTriesLeft()
  const message = hasLost()
    ? t('defeat', { word })
    : hasWon()
      ? t('win', { word })
      : t('tries_left', { tries })

  displayCurrentWordStatus.call(this)
  displayEmptyLine.call(this)
  displayMessage.call(this, message)
  displayEmptyLine.call(this)
}

// Actions…

const startGame = function (options) {
  store.dispatch(setLanguage(options.lang))
  store.dispatch(setMaxTries(options.tries))
  store.dispatch(isPlaying(true))
  store.dispatch(getWord())
  store.dispatch(resetTries())
  store.dispatch(resetLetters())

  displayEndOfRound.call(this)
}

const abortGame = function () {
  store.dispatch(isPlaying(false))

  displayMessage.call(this, t('abort'))
}

const playRound = function (letter) {
  const hasBeenTried = hasLetterBeenTried(letter)

  store.dispatch(tryLetter(letter))

  if (!hasBeenTried && !hasWordLetter(letter)) {
    store.dispatch(incrementTries())
  }

  displayCurrentLetter.call(this, letter, hasBeenTried)
  displayEndOfRound.call(this)
}

const executeStartCommand = function (args, callback) {
  const { tries, lang } = args.options

  startGame.call(this, {
    tries: tries || DEFAULT_MAX_TRIES,
    lang: lang || DEFAULT_LANGUAGE
  })

  callback()
}

const executeTryCommand = function (args, callback) {
  if (!isGameRunning()) {
    displayMessage.call(this, t('argument_game_not_running'))
    return callback()
  }

  playRound.call(this, args.letter)

  if (isOver()) {
    store.dispatch(isPlaying(false))
  }

  callback()
}

const executeLettersCommand = function (args, callback) {
  const letters = getTriedLetters().join(', ')

  if (!isGameRunning()) {
    displayMessage.call(this, t('argument_game_not_running'))
    return callback()
  }

  displayEmptyLine.call(this)
  displayMessage.call(this, t('tried_letters', { letters }))
  displayEmptyLine.call(this)

  callback()
}

module.exports = {
  executeLettersCommand,
  executeTryCommand,
  executeStartCommand,
  abortGame
}
