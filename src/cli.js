const vorpal = require('vorpal')()
const {
  executeStartCommand,
  executeTryCommand,
  executeLettersCommand,
  abortGame
} = require('./')

// UI…

vorpal
  .command('start', 'Start a new game.')
  .option('-t, --tries <tries>', 'Amount of maximum tries.')
  .option('-l, --lang <lang>', 'Language to be used.')
  .action(executeStartCommand)
  .cancel(abortGame.bind(this))

vorpal
  .command('try <letter>', 'Try “letter”.')
  .alias('letter')
  .action(executeTryCommand)
  .cancel(abortGame.bind(this))

vorpal
  .command('letters', 'Give tried letters.')
  .action(executeLettersCommand)
  .cancel(abortGame.bind(this))

// Run…

vorpal
  .delimiter('hm:')
  .show()
