const assert = require('assert')
const reducer = require('../../src/reducers/words')
const { DEFAULT_LANGUAGE } = require('../../src/configuration')

describe('Game reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(
      reducer(undefined, {}),
      { lang: DEFAULT_LANGUAGE, word: null }
    )
  })

  it('should handle GET_WORD', () => {
    assert.notEqual(
      reducer({ lang: DEFAULT_LANGUAGE, word: null }, { type: 'GET_WORD' }).word,
      null
    )
  })

  it('should handle SET_LANGUAGE', () => {
    assert.deepEqual(
      reducer({ lang: DEFAULT_LANGUAGE, word: null }, { type: 'SET_LANGUAGE', value: 'fr' }),
      { lang: 'fr', word: null }
    )
  })
})
