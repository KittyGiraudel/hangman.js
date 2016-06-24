const initialState = {
  isPlaying: false
}

function game (state = initialState, action) {
  switch (action.type) {
    case 'IS_PLAYING':
      return Object.assign({}, state, { isPlaying: action.value })
  }

  return state
}

module.exports = game
