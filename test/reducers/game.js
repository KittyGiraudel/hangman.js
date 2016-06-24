const assert = require('assert')
const reducer = require('../../src/reducers/game')

describe('Game reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(
      reducer(undefined, {}),
      { isPlaying: false }
    )
  })

  it('should handle IS_PLAYING', () => {
    assert.deepEqual(
      reducer(undefined, { type: 'IS_PLAYING', value: true }),
      { isPlaying: true }
    )

    assert.deepEqual(
      reducer(undefined, { type: 'IS_PLAYING', value: false }),
      { isPlaying: false }
    )
  })
})
