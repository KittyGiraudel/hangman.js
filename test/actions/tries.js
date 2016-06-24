const assert = require('assert')
const { incrementTries, resetTries, setMaxTries } = require('../../src/actions/tries')

describe('Tries actions', () => {
  it('should create an action to increment tries', () => {
    const actual = incrementTries()
    const expect = { type: 'INCREMENT_TRIES' }

    assert.deepEqual(actual, expect)
  })

  it('should create an action to reset tries', () => {
    const actual = resetTries()
    const expect = { type: 'RESET_TRIES' }

    assert.deepEqual(actual, expect)
  })

  it('should create an action to set max tries', () => {
    const actual = setMaxTries(5)
    const expect = { type: 'SET_MAX_TRIES', value: 5 }

    assert.deepEqual(actual, expect)
  })
})
