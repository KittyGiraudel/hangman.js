const vorpal = require('vorpal')()
const t = require('./helpers/translations')('en')
const { execStartCmd, execTryCmd, execLettersCmd } = require('./')
const DELIMITER = 'hm:'

// UI…

vorpal
  .command('start', t('argument.start.description'))
  .option('-t, --tries <tries>', t('option.lang.description'))
  .option('-l, --lang <lang>', t('option.tries.description'))
  .action(execStartCmd)

vorpal
  .command('try <letter>', t('argument.try.description'))
  .alias('letter')
  .action(execTryCmd)

vorpal
  .command('letters', t('argument.letters.description'))
  .action(execLettersCmd)

// Run…

vorpal
  .delimiter(DELIMITER)
  .show()
