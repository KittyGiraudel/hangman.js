const assert = require('assert')
const { isPlaying } = require('../../src/actions/game')

describe('Game actions', () => {
  it('should create an action to toggle the game status', () => {
    const actual = isPlaying(true)
    const expect = { type: 'IS_PLAYING', value: true }

    assert.deepEqual(actual, expect)
  })
})
