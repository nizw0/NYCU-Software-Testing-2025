import { NonNumericInputError } from './error'

class Calc {
  static add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new NonNumericInputError()
    }
    return a + b
  }

  static subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new NonNumericInputError()
    }
    return a - b
  }

  static multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new NonNumericInputError()
    }
    return a * b
  }

  static divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new NonNumericInputError()
    }
    if (b === 0) {
      return NaN
    }
    return a / b
  }
}

export default Calc
