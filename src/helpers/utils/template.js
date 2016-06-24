const template = (input, values = {}) => {
  for (var key in values) {
    input = input.replace(new RegExp('{' + key + '}', 'g'), values[key])
  }

  return input
}

module.exports = template
