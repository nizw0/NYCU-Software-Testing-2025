class ExceedingSafeIntegerError extends Error {
  constructor(message = '') {
    super(message)
    this.name = 'ExceedingSafeIntegerError'
  }
}

class NonNumericInputError extends Error {
  constructor(message = '') {
    super(message)
    this.name = 'NonNumericInputError'
  }
}

export { ExceedingSafeIntegerError, NonNumericInputError }
