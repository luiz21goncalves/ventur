import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'

import { removeDuplicateDates } from './remove-duplicate-dates'

describe('removeDuplicateDates', () => {
  it('should be able to remove duplicate dates when receiving duplicate dates', () => {
    const today = dayjs()

    const uniqueDates = removeDuplicateDates([
      today.toISOString(),
      today.add(1, 'day').toISOString(),
      today.add(1, 'day').add(1, 'hour').toISOString(),
    ])

    expect(uniqueDates).toStrictEqual([
      today.startOf('date').toISOString(),
      today.add(1, 'day').startOf('date').toISOString(),
    ])
  })

  it('should be able to remove duplicate dates when receiving non-duplicate dates', () => {
    const today = dayjs()

    const uniqueDates = removeDuplicateDates([
      today.toISOString(),
      today.add(1, 'day').toISOString(),
      today.add(2, 'day').toISOString(),
    ])

    expect(uniqueDates).toStrictEqual([
      today.startOf('date').toISOString(),
      today.add(1, 'day').startOf('date').toISOString(),
      today.add(2, 'day').startOf('date').toISOString(),
    ])
  })
})
