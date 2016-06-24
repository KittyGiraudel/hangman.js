const { getSolution, t } = require('./words')
const { getTriesLeft } = require('./tries')
const { isWon, isLost } = require('./game')
const { getCurrentWordStatus } = require('./letters')

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

  const message = isLost()
    ? t('defeat', { word })
    : isWon()
      ? t('win', { word })
      : t('tries_left', { tries })

  this.log(getCurrentWordStatus())
  this.log('')
  this.log(message)
  this.log('')
}

module.exports = {
  displayGameStatus, 
  displayCurrentRound
}
