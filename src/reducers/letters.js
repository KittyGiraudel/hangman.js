const initialState = []

function letters (state = initialState, action) {
  switch (action.type) {
    case 'TRY_LETTER':
      if (state.indexOf(action.letter) === -1) {
        return [...state, action.letter]
      } else {
        return state
      }
    case 'RESET_LETTERS':
      return initialState
  }

  return state
}

module.exports = letters
