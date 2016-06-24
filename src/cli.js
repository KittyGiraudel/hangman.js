const vorpal = require('vorpal')()
const t = require('./helpers/utils/translations')('en')
const { execStartCmd, execTryCmd, execLettersCmd } = require('./')
const { getNotTriedLetters } = require('./helpers/letters')
const DELIMITER = 'hm:'

const validateTryCmd = function (args) {
  if (typeof args.letter !== 'string' || args.letter.length !== 1) {
    return t('argument.try.invalid')
  }

  return true
}

vorpal
  .command('start', t('argument.start.description'))
  .option('-t, --tries <tries>', t('option.lang.description'))
  .option('-l, --lang <lang>', t('option.tries.description'))
  .action(execStartCmd)

vorpal
  .command('try <letter>', t('argument.try.description'))
  .alias('letter')
  .autocomplete(getNotTriedLetters)
  .validate(validateTryCmd)
  .action(execTryCmd)

vorpal
  .command('letters', t('argument.letters.description'))
  .action(execLettersCmd)

vorpal
  .delimiter(DELIMITER)
  .show()
