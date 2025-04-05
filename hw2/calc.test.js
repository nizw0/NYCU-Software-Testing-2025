import { describe, expect, test } from 'vitest'
import Calc from './calc'
import { ExceedingSafeIntegerError, NonNumericInputError } from './errors'

describe('subtract operation', () => {
  test('non-numeric inputs should throw NonNumericInputError', () => {
    expect(() => Calc.subtract('a', 1)).toThrow(NonNumericInputError)
    expect(() => Calc.subtract(1, 'b')).toThrow(NonNumericInputError)
    expect(() => Calc.subtract('a', 'b')).toThrow(NonNumericInputError)
    expect(() => Calc.subtract({}, 1)).toThrow(NonNumericInputError)
    expect(() => Calc.subtract(1, {})).toThrow(NonNumericInputError)
    expect(() => Calc.subtract([], 1)).toThrow(NonNumericInputError)
    expect(() => Calc.subtract(1, [])).toThrow(NonNumericInputError)
  })

  test('two integers subtract', () => {
    expect(Calc.subtract(0, 0)).toBe(0)
    expect(Calc.subtract(1, 0)).toBe(1)
    expect(Calc.subtract(0, 1)).toBe(-1)
    expect(Calc.subtract(5, 10)).toBe(-5)
    expect(Calc.subtract(10, 5)).toBe(5)
    expect(Calc.subtract(1, 10)).toBe(-9)
    expect(Calc.subtract(20000, 12345)).toBe(7655)
  })

  test('result should between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER', () => {
    expect(() => Calc.subtract(Number.MIN_SAFE_INTEGER, 1)).toThrow(ExceedingSafeIntegerError)
    expect(() => Calc.subtract(1, Number.MIN_SAFE_INTEGER)).toThrow(ExceedingSafeIntegerError)
    expect(() => Calc.subtract(Number.MAX_SAFE_INTEGER, -1)).toThrow(ExceedingSafeIntegerError)
    expect(() => Calc.subtract(-1, Number.MAX_SAFE_INTEGER)).toThrow(ExceedingSafeIntegerError)
  })
})

describe('multiply operation', () => {
  test('non-numeric inputs should throw NonNumericInputError', () => {
    expect(() => Calc.multiply('a', 1)).toThrow(NonNumericInputError)
    expect(() => Calc.multiply(1, 'b')).toThrow(NonNumericInputError)
    expect(() => Calc.multiply('a', 'b')).toThrow(NonNumericInputError)
    expect(() => Calc.multiply({}, 1)).toThrow(NonNumericInputError)
    expect(() => Calc.multiply(1, {})).toThrow(NonNumericInputError)
    expect(() => Calc.multiply([], 1)).toThrow(NonNumericInputError)
    expect(() => Calc.multiply(1, [])).toThrow(NonNumericInputError)
  })

  test('two integers multiply', () => {
    expect(Calc.multiply(0, 0)).toBe(0)
    expect(Calc.multiply(1, 0)).toBe(0)
    expect(Calc.multiply(0, 1)).toBe(0)
    expect(Calc.multiply(5, 10)).toBe(50)
    expect(Calc.multiply(10, 5)).toBe(50)
    expect(Calc.multiply(1, 10)).toBe(10)
    expect(Calc.multiply(20000, 12345)).toBe(246900000)
  })

  test('result should between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER', () => {
    expect(() => Calc.multiply(Number.MIN_SAFE_INTEGER, 2)).toThrow(ExceedingSafeIntegerError)
    expect(() => Calc.multiply(10, Number.MIN_SAFE_INTEGER)).toThrow(ExceedingSafeIntegerError)
    expect(() => Calc.multiply(Number.MAX_SAFE_INTEGER, -2)).toThrow(ExceedingSafeIntegerError)
    expect(() => Calc.multiply(-10, Number.MAX_SAFE_INTEGER)).toThrow(ExceedingSafeIntegerError)
  })
})

describe('divide operation', () => {
  test('non-numeric inputs should throw NonNumericInputError', () => {
    expect(() => Calc.divide('a', 1)).toThrow(NonNumericInputError)
    expect(() => Calc.divide(1, 'b')).toThrow(NonNumericInputError)
    expect(() => Calc.divide('a', 'b')).toThrow(NonNumericInputError)
    expect(() => Calc.divide({}, 1)).toThrow(NonNumericInputError)
    expect(() => Calc.divide(1, {})).toThrow(NonNumericInputError)
    expect(() => Calc.divide([], 1)).toThrow(NonNumericInputError)
    expect(() => Calc.divide(1, [])).toThrow(NonNumericInputError)
  })

  test('two integers divide and return rounded result', () => {
    expect(Calc.divide(0, 1)).toBe(0)
    expect(Calc.divide(1, 1)).toBe(1)
    expect(Calc.divide(5, 10)).toBe(1)
    expect(Calc.divide(10, 5)).toBe(2)
    expect(Calc.divide(1, 10)).toBe(0)
    expect(Calc.divide(20000, 12345)).toBe(2)
  })

  test('divisor is zero should return NaN', () => {
    expect(Calc.divide(10, 0)).toBeNaN()
    expect(Calc.divide(-10, 0)).toBeNaN()
    expect(Calc.divide(0, 0)).toBeNaN()
  })

  test('result should between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER', () => {
    expect(() => Calc.divide(Number.MIN_SAFE_INTEGER, 0.01)).toThrow(ExceedingSafeIntegerError)
    expect(() => Calc.divide(Number.MAX_SAFE_INTEGER, 0.01)).toThrow(ExceedingSafeIntegerError)
  })
})
