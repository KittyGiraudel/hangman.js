const assert = require('assert')
const { tryLetter, resetLetters } = require('../../src/actions/letters')

describe('Letters actions', () => {
  it('should create an action to try a letter', () => {
    const actual = tryLetter('a')
    const expect = { type: 'TRY_LETTER', letter: 'a' }

    assert.deepEqual(actual, expect)
  })

  it('should create an action to reset the letters', () => {
    const actual = resetLetters()
    const expect = { type: 'RESET_LETTERS' }

    assert.deepEqual(actual, expect)
  })
})
