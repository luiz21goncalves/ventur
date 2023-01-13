import { describe, expect, it } from 'vitest'

import { getWeekdays } from './get-weekdays'

describe('getWeekdays', () => {
  it('should be able to return an object containing weekdays in a long format', () => {
    const weekdays = getWeekdays()

    expect(weekdays.long).toStrictEqual(
      expect.arrayContaining([
        'domingo',
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado',
      ]),
    )
  })
  it('should be able to return an object containing weekdays in a short format', () => {
    const weekdays = getWeekdays()

    expect(weekdays.short).toStrictEqual(
      expect.arrayContaining(['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']),
    )
  })
})
