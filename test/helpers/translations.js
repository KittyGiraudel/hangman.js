const assert = require('assert')
const translations = require('../../src/helpers/utils/translations')

describe('translations helper', () => {
  it('should return a function', () => {
    const actual = typeof translations('fr')
    const expect = 'function'

    assert.deepEqual(actual, expect)
  })

  it('should return key when not found in dictionary', () => {
    const actual = translations('fr')('foo')
    const expect = 'foo'

    assert.deepEqual(actual, expect)
  })

  it('should return correct translation when found in dictionary', () => {
    const actual = translations('fr')('option.tries.description')
    const expect = 'Langue du jeu.'

    assert.deepEqual(actual, expect)
  })
})
