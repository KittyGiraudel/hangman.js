const assert = require('assert')
const getDictionary = require('../../src/helpers/utils/getDictionary')

describe('getDictionary helper', () => {
  it('should return the default language dictionary when invalid language given', () => {
    const actual = getDictionary('foobar')
    const expect = require('../../src/data/en/words')

    assert.deepEqual(actual, expect)
  })

  it('should return the language dictionary when valid language given', () => {
    const actual = getDictionary('fr')
    const expect = require('../../src/data/fr/words')

    assert.deepEqual(actual, expect)
  })
})
