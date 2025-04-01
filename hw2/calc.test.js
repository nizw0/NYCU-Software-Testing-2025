import { describe, expect, test } from 'vitest'
import Calc from './calc'

describe('subtract operation', () => {
  test('normal behaviors', () => {
    expect(Calc.subtract(0, 0)).toBe(0)
    expect(Calc.subtract(1, 0)).toBe(1)
    expect(Calc.subtract(0, 1)).toBe(-1)
    expect(Calc.subtract(10, 5)).toBe(5)
    expect(Calc.subtract(1, 10)).toBe(-9)
    expect(Calc.subtract(20000, 12345)).toBe(7655)
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
})
