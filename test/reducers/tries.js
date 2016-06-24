const assert = require('assert')
const reducer = require('../../src/reducers/tries')
const { DEFAULT_MAX_TRIES } = require('../../src/configuration')

describe('Tries reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(
      reducer(undefined, {}),
      { max: DEFAULT_MAX_TRIES, count: 0 }
    )
  })

  it('should handle INCREMENT_TRIES', () => {
    assert.deepEqual(
      reducer({ max: DEFAULT_MAX_TRIES, count: 0 }, { type: 'INCREMENT_TRIES' }),
      { max: DEFAULT_MAX_TRIES, count: 1 }
    )
  })

  it('should handle RESET_TRIES', () => {
    assert.deepEqual(
      reducer({ max: DEFAULT_MAX_TRIES, count: 5 }, { type: 'RESET_TRIES' }),
      { max: DEFAULT_MAX_TRIES, count: 0 }
    )
  })

  it('should handle SET_MAX_TRIES', () => {
    assert.deepEqual(
      reducer({ max: DEFAULT_MAX_TRIES, count: 0 }, { type: 'SET_MAX_TRIES', value: 5 }),
      { max: 5, count: 0 }
    )
  })
})
