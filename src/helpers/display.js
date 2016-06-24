const chalk = require('chalk')
const { getTriesLeft, getCurrentWord, getTriedLetters } = require('../store/connect')
const { getCurrentWordStatus } = require('./letters')
const { isWon, isLost } = require('./game')
const { t } = require('./words')

const displayCurrentRound = function (letter, hasBeenTried) {
  this.log('')

  if (hasBeenTried) {
    this.log(t('tried_letter', { letter }))
  } else {
    this.log(t('try_letter', { letter }))
  }
}

const displayGameStatus = function () {
  const word = getCurrentWord()
  const tries = getTriesLeft()
  const current = getCurrentWordStatus()

  this.log(current)
  this.log('')

  if (isLost()) {
    this.log(chalk.red(t('defeat', { word })))
  } else if (isWon()) {
    this.log(chalk.green(t('win', { word })))
  } else {
    this.log(chalk.yellow(t('tries_left', { tries })))
  }
  
  this.log('')
}

const displayInvalidArgument = function () {
  this.log(chalk.red(t('argument_game_not_running')))
  this.log('')
}

const displayTriedLetters = function () {
  const letters = getTriedLetters().join(', ')
  this.log('')
  this.log(chalk.yellow(t('tried_letters', { letters })))
  this.log('')
}

module.exports = {
  gameStatus: displayGameStatus, 
  triedLetters: displayTriedLetters,
  currentRound: displayCurrentRound,
  invalidArgument: displayInvalidArgument
}
