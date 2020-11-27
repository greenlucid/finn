

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  const jwt = require('jsonwebtoken')
  console.error(...params)
}

module.exports = {
  info, error
}