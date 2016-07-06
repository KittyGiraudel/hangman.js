const { DEFAULT_MAX_TRIES } = require('../configuration')

const initialState = {
  max: DEFAULT_MAX_TRIES,
  count: 0
}

function tries (state = initialState, action) {
  switch (action.type) {
    case 'SET_MAX_TRIES':
      return Object.assign({}, state, { max: action.value })
    case 'INCREMENT_TRIES':
      return Object.assign({}, state, { count: (state.count + 1) })
    case 'RESET_TRIES':
      return Object.assign({}, state, { count: initialState.count })
  }

  return state
}

module.exports = tries
