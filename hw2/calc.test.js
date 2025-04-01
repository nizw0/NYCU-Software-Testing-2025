import { describe, expect, test } from 'vitest'
import Calc from './calc'
import { NonNumericInputError } from './error'

describe('add operation', () => {
  test('normal behaviors', () => {
    expect(Calc.add(0, 0)).toBe(0)
    expect(Calc.add(1, 0)).toBe(1)
    expect(Calc.add(0, 1)).toBe(1)
    expect(Calc.add(10, 5)).toBe(15)
    expect(Calc.add(1, 10)).toBe(11)
    expect(Calc.add(20000, 12345)).toBe(32345)
  })
  test('non-numeric inputs should throw the specific error', () => {
    expect(() => Calc.add('a', 10)).toThrow(NonNumericInputError)
    expect(() => Calc.add(10, 'b')).toThrow(NonNumericInputError)
    expect(() => Calc.add('a', 'b')).toThrow(NonNumericInputError)
  })
})

describe('subtract operation', () => {
  test('normal behaviors', () => {
    expect(Calc.subtract(0, 0)).toBe(0)
    expect(Calc.subtract(1, 0)).toBe(1)
    expect(Calc.subtract(0, 1)).toBe(-1)
    expect(Calc.subtract(10, 5)).toBe(5)
    expect(Calc.subtract(1, 10)).toBe(-9)
    expect(Calc.subtract(20000, 12345)).toBe(7655)
  })

  test('non-numeric inputs should throw the specific error', () => {
    expect(() => Calc.subtract('a', 10)).toThrow(NonNumericInputError)
    expect(() => Calc.subtract(10, 'b')).toThrow(NonNumericInputError)
    expect(() => Calc.subtract('a', 'b')).toThrow(NonNumericInputError)
  })
})

describe('multiply operation', () => {
  test('normal behaviors', () => {
    expect(Calc.multiply(0, 0)).toBe(0)
    expect(Calc.multiply(1, 0)).toBe(0)
    expect(Calc.multiply(0, 1)).toBe(0)
    expect(Calc.multiply(10, 5)).toBe(50)
    expect(Calc.multiply(1, 10)).toBe(10)
    expect(Calc.multiply(20000, 12345)).toBe(246900000)
  })

  test('non-numeric inputs should throw the specific error', () => {
    expect(() => Calc.multiply('a', 10)).toThrow(NonNumericInputError)
    expect(() => Calc.multiply(10, 'b')).toThrow(NonNumericInputError)
    expect(() => Calc.multiply('a', 'b')).toThrow(NonNumericInputError)
  })
})

describe('divide operation', () => {
  test('normal behaviors', () => {
    expect(Calc.divide(0, 1)).toBe(0)
    expect(Calc.divide(1, 1)).toBe(1)
    expect(Calc.divide(10, 5)).toBe(2)
    expect(Calc.divide(1, 10)).toBeCloseTo(0.1)
    expect(Calc.divide(20000, 12345)).toBeCloseTo(1.62)
  })

  test('divisor is zero should return NaN', () => {
    expect(Calc.divide(10, 0)).toBeNaN()
    expect(Calc.divide(-10, 0)).toBeNaN()
    expect(Calc.divide(0, 0)).toBeNaN()
  })

  test('non-numeric inputs should throw the specific error', () => {
    expect(() => Calc.divide('a', 10)).toThrow(NonNumericInputError)
    expect(() => Calc.divide(10, 'b')).toThrow(NonNumericInputError)
    expect(() => Calc.divide('a', 'b')).toThrow(NonNumericInputError)
  })
})
