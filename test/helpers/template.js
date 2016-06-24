const assert = require('assert')
const template = require('../../src/helpers/utils/template')

describe('template helper', () => {
  it('should return string as is when no values given', () => {
    const actual = template('Hello {token}')
    const expect = 'Hello {token}'

    assert.deepEqual(actual, expect)
  })

  it('should return string with replaced tokens when given', () => {
    const actual = template('Hello {token}', { token: 'world' })
    const expect = 'Hello world'

    assert.deepEqual(actual, expect)
  })
})
