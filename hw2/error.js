class NonNumericInputError extends Error {
  constructor(message = '') {
    super(message)
    this.name = 'NonNumericInputError'
  }
}

export { NonNumericInputError }
