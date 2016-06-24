const tryLetter = (letter) => ({
  type: 'TRY_LETTER',
  letter: letter
})

const resetLetters = () => ({
  type: 'RESET_LETTERS'
})

module.exports = {
  tryLetter,
  resetLetters
}
