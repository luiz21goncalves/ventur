import { describe, expect } from 'vitest'

import { verifyIsValidWeekdayArray } from './verify-is-valid-weekday-array'

describe('verifyIsValidWeekdayArray', () => {
  it('should be able to return true when receiving a valid weekdays', () => {
    const isValid = verifyIsValidWeekdayArray(
      Array.from({ length: 7 }).map((_, index) => index),
    )

    expect(isValid).toEqual(true)
  })

  it('should be able to return false when receiving an array containing more than 7 positions', () => {
    const isValid = verifyIsValidWeekdayArray(
      Array.from({ length: 8 }).map((_, index) => index),
    )

    expect(isValid).toEqual(false)
  })

  it('should be able to return false when receiving an array containing an invalid weekdays', () => {
    const isValid = verifyIsValidWeekdayArray([7, 8, 9, 10, 11, 12, 13])

    expect(isValid).toEqual(false)
  })

  it('should be able to return false weekday when receiving an array containing a one invalid weekdays', () => {
    const isValid = verifyIsValidWeekdayArray([1, 3, 5, 8])

    expect(isValid).toEqual(false)
  })
})
