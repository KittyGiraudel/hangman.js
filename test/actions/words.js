const assert = require('assert')
const { getWord, setLanguage } = require('../../src/actions/words')

describe('Words actions', () => {
  it('should create an action to get a word', () => {
    const actual = getWord()
    const expect = { type: 'GET_WORD' }

    assert.deepEqual(actual, expect)
  })

  it('should create an action to set the language', () => {
    const actual = setLanguage('fr')
    const expect = { type: 'SET_LANGUAGE', value: 'fr' }

    assert.deepEqual(actual, expect)
  })
})
