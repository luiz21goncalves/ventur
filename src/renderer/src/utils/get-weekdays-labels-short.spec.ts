import { describe, it } from 'vitest'

import { getWeekdaysLabelsShort } from './get-weekdays-labels-short'

describe('getWeekdaysLabels', () => {
  it('should be able to return weekday labels', () => {
    const weekdaysLabels = getWeekdaysLabelsShort([6, 5, 4, 3, 2, 1, 0])

    expect(weekdaysLabels).toHaveLength(7)
    expect(weekdaysLabels).toStrictEqual([
      'sáb',
      'sex',
      'qui',
      'qua',
      'ter',
      'seg',
      'dom',
    ])
  })

  it('should not be able to return weekday labels when receiving an array containing more than 7 positions', () => {
    const weekdaysLabels = getWeekdaysLabelsShort(
      Array.from({ length: 8 }).map((_, index) => index),
    )

    expect(weekdaysLabels).toHaveLength(0)
    expect(weekdaysLabels).toStrictEqual([])
  })

  it('should not be able to return weekday labels when receiving an array containing an invalid weekday index', () => {
    const weekdaysLabels = getWeekdaysLabelsShort([7, 8, 9, 10, 11, 12, 13])

    expect(weekdaysLabels).toHaveLength(0)
    expect(weekdaysLabels).toStrictEqual([])
  })

  it('should not be able to return weekday labels when receiving an array containing a one invalid index', () => {
    const weekdaysLabels = getWeekdaysLabelsShort([1, 3, 5, 8])

    expect(weekdaysLabels).toHaveLength(0)
    expect(weekdaysLabels).toStrictEqual([])
  })
})
