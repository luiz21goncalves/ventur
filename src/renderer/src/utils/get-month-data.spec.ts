import { describe, expect, it } from 'vitest'

import { getMonthDays } from './get-month-data'

describe('getMonthDays', () => {
  it('should be able to return an object with all days and days amount for a date', () => {
    const { days, daysAmount } = getMonthDays(new Date(Date.UTC(2021, 2, 1)))

    expect(days).toHaveLength(28)
    expect(daysAmount).toEqual(28)
  })
})
