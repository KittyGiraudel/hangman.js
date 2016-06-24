'use strict'

const { DEFAULT_MAX_TRIES, DEFAULT_LANGUAGE } = require('./configuration')
const { isOver, startGame, playRound, stopGame } = require('./helpers/game')
const { isRunning } = require('./store/connect')
const display = require('./helpers/display')

const execStartCmd = function (args, callback) {
  const tries = args.options.tries || DEFAULT_MAX_TRIES
  const lang = args.options.lang || DEFAULT_LANGUAGE

  startGame({ tries, lang })
  display.gameStatus.call(this)
  callback()
}

const execTryCmd = function (args, callback) {
  const { letter } = args

  if (!isRunning()) {
    display.invalidArgument.call(this)
  } else {
    const hasBeenTried = playRound(letter)

    display.currentRound.call(this, letter, hasBeenTried)
    display.gameStatus.call(this)

    isOver() && stopGame()
  }

  callback()
}

const execLettersCmd = function (args, callback) {
  if (!isRunning()) {
    display.invalidArgument.call(this)
  } else {
    display.triedLetters.call(this)
  }

  callback()
}

module.exports = {
  execLettersCmd,
  execTryCmd,
  execStartCmd
}
