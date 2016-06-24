const { getState } = require('../store')

const getTriesLeft = () => {
  const state = getState()
  return state.tries.max - state.tries.count
}

module.exports = {
  getTriesLeft
}
