import { beforeEach, describe, expect, test } from 'vitest'
import { DayType, Period, ProgrammedSettings } from './ProgrammedSettings'
import Thermostat from './Thermostat'

describe('Predicate Coverage Tests', () => {
  let thermostat
  let settings

  beforeEach(() => {
    thermostat = new Thermostat()
    settings = new ProgrammedSettings()

    thermostat.period = Period.DAY
    thermostat.day = DayType.WEEKDAY
    thermostat.thresholdDiff = 2
    thermostat.minLag = 10
  })

  // heaterOn = true 的情況（溫度差 > thresholdDiff 且 時間差 >= minLag）
  test('PC-T1: Predicate is true (heaterOn = true)', () => {
    settings.setSetting(Period.DAY, DayType.WEEKDAY, 70)

    thermostat.setCurrentTemp(65) // 70 - 65 > 2, true
    thermostat.timeSinceLastRun = 15 // 15 >= 10, true

    const result = thermostat.turnHeaterOn(settings)

    expect(result.heaterOn).toBe(true)
  })

  // heaterOn = false 的情況（溫度差 <= thresholdDiff）
  test('PC-T2: Predicate is false (heaterOn = false)', () => {
    settings.setSetting(Period.DAY, DayType.WEEKDAY, 70)

    thermostat.setCurrentTemp(70) // 70 - 70 <= 2, false
    thermostat.timeSinceLastRun = 15

    const result = thermostat.turnHeaterOn(settings)

    expect(result.heaterOn).toBe(false)
  })
})

describe('Clause Coverage Tests', () => {
  let thermostat
  let settings

  beforeEach(() => {
    thermostat = new Thermostat()
    settings = new ProgrammedSettings()

    thermostat.period = Period.DAY
    thermostat.day = DayType.WEEKDAY
    thermostat.thresholdDiff = 2
    thermostat.minLag = 10
  })

  // 溫度差 > thresholdDiff、時間差 >= minLag︰heaterOn = true
  test('CC-T1: Clause A is true, Clause B is true (heaterOn = true)', () => {
    settings.setSetting(Period.DAY, DayType.WEEKDAY, 70)

    thermostat.setCurrentTemp(65) // 70 - 65 > 2, true
    thermostat.timeSinceLastRun = 15 // 15 >= 10, true

    const result = thermostat.turnHeaterOn(settings)

    expect(result.heaterOn).toBe(true)
  })

  // 溫度差 <= thresholdDiff、時間差 >= minLag︰heaterOn = false
  test('CC-T2: Clause A is false, Clause B is true (heaterOn = false)', () => {
    settings.setSetting(Period.DAY, DayType.WEEKDAY, 70)

    thermostat.setCurrentTemp(72) // 70 - 72 <= 2, false
    thermostat.timeSinceLastRun = 15 // 15 >= 10, true

    const result = thermostat.turnHeaterOn(settings)

    expect(result.heaterOn).toBe(false)
  })

  // 溫度差 > thresholdDiff、時間差 < minLag︰heaterOn = false
  test('CC-T3: Clause A is true, Clause B is false (heaterOn = false)', () => {
    settings.setSetting(Period.DAY, DayType.WEEKDAY, 70)

    thermostat.setCurrentTemp(65) // 70 - 65 > 2, true
    thermostat.timeSinceLastRun = 5 // 5 < 10, false

    const result = thermostat.turnHeaterOn(settings)

    expect(result.heaterOn).toBe(false)
  })

  // 溫度差 <= thresholdDiff、時間差 < minLag︰heaterOn = false
  test('CC-T4: Clause A is false, Clause B is false (heaterOn = false)', () => {
    settings.setSetting(Period.DAY, DayType.WEEKDAY, 70)

    thermostat.setCurrentTemp(72) // 70 - 72 <= 2, false
    thermostat.timeSinceLastRun = 5 // 5 < 10, false

    const result = thermostat.turnHeaterOn(settings)

    expect(result.heaterOn).toBe(false)
  })
})

describe('Correlated Active Clause Coverage Tests', () => {
  let thermostat
  let settings

  beforeEach(() => {
    thermostat = new Thermostat()
    settings = new ProgrammedSettings()

    thermostat.period = Period.DAY
    thermostat.day = DayType.WEEKDAY
    thermostat.thresholdDiff = 2
    thermostat.minLag = 10
  })

  // 測試 Clause A 的影響，令 Clause B = true
  // 若 Clause A = true，則 heaterOn = true
  test('CACC-T1: Clause A is true, Clause B is true (heaterOn = true)', () => {
    settings.setSetting(Period.DAY, DayType.WEEKDAY, 70)

    thermostat.setCurrentTemp(65) // 70 - 65 > 2, true
    thermostat.timeSinceLastRun = 15 // true

    const result = thermostat.turnHeaterOn(settings)

    expect(result.heaterOn).toBe(true)
  })

  // 若 Clause A = false，則 heaterOn = false
  test('CACC-T2: Clause A is false, Clause B is true (heaterOn = false)', () => {
    settings.setSetting(Period.DAY, DayType.WEEKDAY, 70)

    thermostat.setCurrentTemp(72) // 70 - 72 <= 2, false
    thermostat.timeSinceLastRun = 15 // true

    const result = thermostat.turnHeaterOn(settings)

    expect(result.heaterOn).toBe(false)
  })

  // 測試 Clause B 的影響，令 Clause A = true
  // 若 Clause B = true，則 heaterOn = true
  test('CACC-T3: Clause A is true, Clause B is true (heaterOn = true)', () => {
    settings.setSetting(Period.DAY, DayType.WEEKDAY, 70)

    thermostat.setCurrentTemp(65) // true
    thermostat.timeSinceLastRun = 15 // 15 >= 10, true

    const result = thermostat.turnHeaterOn(settings)

    expect(result.heaterOn).toBe(true)
  })

  // 若 Clause B = false，則 heaterOn = false
  test('CACC-T4: Clause A is true, Clause B is false (heaterOn = false)', () => {
    settings.setSetting(Period.DAY, DayType.WEEKDAY, 70)

    thermostat.setCurrentTemp(65) // true
    thermostat.timeSinceLastRun = 5 // 5 < 10, false

    const result = thermostat.turnHeaterOn(settings)

    expect(result.heaterOn).toBe(false)
  })
})
