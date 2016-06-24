'use strict'

// Actions
const { isPlaying } = require('./actions/game')
const { tryLetter, resetLetters } = require('./actions/letters')
const { resetTries, incrementTries, setMaxTries } = require('./actions/tries')
const { getWord, setLanguage } = require('./actions/words')

// Helpers
const { getTriedLetters, hasWordLetter, hasLetterBeenTried } = require('./helpers/letters')
const { isOver, isRunning } = require('./helpers/game')
const { t } = require('./helpers/words')
const { displayGameStatus, displayCurrentRound } = require('./helpers/display')

// Default configuratioh
const { DEFAULT_MAX_TRIES, DEFAULT_LANGUAGE } = require('./configuration')

// Store
const store = require('./store')

// Actions
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
  if (!isRunning()) {
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

  if (!isRunning()) {
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
