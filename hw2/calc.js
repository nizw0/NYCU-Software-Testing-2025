import { ExceedingSafeIntegerError, NonNumericInputError } from './errors'
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

    const result = a - b

    if (!Number.isSafeInteger(result)) {
      throw new ExceedingSafeIntegerError()
    }

    return result
  }

  static multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new NonNumericInputError()
    }

    const result = a * b

    if (!Number.isSafeInteger(result)) {
      throw new ExceedingSafeIntegerError()
    }

    return result
  }

  static divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new NonNumericInputError()
    }
    if (b === 0) {
      return NaN
    }

    const result = Math.round(a / b)

    if (!Number.isSafeInteger(result)) {
      throw new ExceedingSafeIntegerError()
    }

    return result
  }
}

export default Calc
