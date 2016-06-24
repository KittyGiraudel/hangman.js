const incrementTries = () => ({
  type: 'INCREMENT_TRIES'
})

const resetTries = () => ({
  type: 'RESET_TRIES'
})

const setMaxTries = (value) => ({
  type: 'SET_MAX_TRIES',
  value: value
})

module.exports = {
  incrementTries,
  resetTries,
  setMaxTries
}
