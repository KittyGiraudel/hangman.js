const assert = require('assert')
const reducer = require('../../src/reducers/letters')

describe('Letters reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(
      reducer(undefined, {}),
      []
    )
  })

  it('should handle RESET_LETTERS', () => {
    assert.deepEqual(
      reducer(['a', 'b'], { type: 'RESET_LETTERS' }),
      []
    )
  })

  it('should handle TRY_LETTER', () => {
    assert.deepEqual(
      reducer([], { type: 'TRY_LETTER', letter: 'a' }),
      ['a']
    )

    assert.deepEqual(
      reducer(['a'], { type: 'TRY_LETTER', letter: 'b' }),
      ['a', 'b']
    )

    assert.deepEqual(
      reducer(['a'], { type: 'TRY_LETTER', letter: 'a' }),
      ['a']
    )
  })
})
