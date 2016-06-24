const { combineReducers } = require('redux')
const letters = require('./letters')
const words = require('./words')
const tries = require('./tries')
const game = require('./game')

module.exports = combineReducers({
  letters,
  words,
  tries,
  game
})
