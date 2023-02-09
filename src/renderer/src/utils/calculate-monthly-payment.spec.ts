import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'

import { calculateMonthlyPayment } from './calculate-monthly-payment'

describe('calculateMonthlyPayment', () => {
  it('should be able to calculate monthly payment', () => {
    const referenceDate = dayjs().set('month', 2)
    const firstMonthDay = referenceDate.startOf('month')

    const priceInCents = calculateMonthlyPayment({
      classDays: [
        firstMonthDay.set('date', 6).toISOString(),
        firstMonthDay.set('date', 13).toISOString(),
        firstMonthDay.set('date', 20).toISOString(),
        firstMonthDay.set('date', 27).toISOString(),
      ],
      holidays: [],
      pricePerMonthInCents: 10000,
      referenceDate: referenceDate.toDate(),
      weekdays: [1],
    })

    expect(priceInCents).toEqual(10000)
  })

  it('should be able to calculate monthly payment when has a holiday', () => {
    const referenceDate = dayjs().set('month', 2)
    const firstMonthDay = referenceDate.startOf('month')

    const priceInCents = calculateMonthlyPayment({
      classDays: [
        firstMonthDay.set('date', 13).toISOString(),
        firstMonthDay.set('date', 20).toISOString(),
        firstMonthDay.set('date', 27).toISOString(),
      ],
      holidays: [firstMonthDay.set('date', 6).toISOString()],
      pricePerMonthInCents: 10000,
      referenceDate: referenceDate.toDate(),
      weekdays: [1],
    })

    expect(priceInCents).toEqual(10000)
  })

  it('should be able to calculate monthly payment when a student takes more classes than they should', () => {
    const referenceDate = dayjs().set('month', 2)
    const firstMonthDay = referenceDate.startOf('month')

    const priceInCents = calculateMonthlyPayment({
      classDays: [
        firstMonthDay.set('date', 6).toISOString(),
        firstMonthDay.set('date', 7).toISOString(),
        firstMonthDay.set('date', 13).toISOString(),
        firstMonthDay.set('date', 20).toISOString(),
        firstMonthDay.set('date', 27).toISOString(),
      ],
      holidays: [],
      pricePerMonthInCents: 10000,
      referenceDate: referenceDate.toDate(),
      weekdays: [1],
    })

    expect(priceInCents).toEqual(12500)
  })

  it('should be able to calculate monthly payment when a student takes fewer classes than they should', () => {
    const referenceDate = dayjs().set('month', 2)
    const firstMonthDay = referenceDate.startOf('month')

    const priceInCents = calculateMonthlyPayment({
      classDays: [
        firstMonthDay.set('date', 13).toISOString(),
        firstMonthDay.set('date', 20).toISOString(),
        firstMonthDay.set('date', 27).toISOString(),
      ],
      holidays: [],
      pricePerMonthInCents: 10000,
      referenceDate: referenceDate.toDate(),
      weekdays: [1],
    })

    expect(priceInCents).toEqual(7500)
  })

  it('should not be able to calculate monthly payment without class days', () => {
    const referenceDate = dayjs().set('month', 2)
    const priceInCents = calculateMonthlyPayment({
      classDays: [],
      holidays: [],
      pricePerMonthInCents: 10000,
      referenceDate: referenceDate.toDate(),
      weekdays: [1, 3, 5],
    })

    expect(priceInCents).toEqual(0)
  })

  it('should not be able to calculate monthly payment without weedays', () => {
    const referenceDate = dayjs().set('month', 2)
    const priceInCents = calculateMonthlyPayment({
      classDays: [
        referenceDate.toISOString(),
        referenceDate.add(1, 'day').toISOString(),
      ],
      holidays: [],
      pricePerMonthInCents: 10000,
      referenceDate: referenceDate.toDate(),
      weekdays: [],
    })

    expect(priceInCents).toEqual(0)
  })

  it('should not be able to calculate monthly payment when receiving invalid weedays', () => {
    const referenceDate = dayjs().set('month', 2)
    const priceInCents = calculateMonthlyPayment({
      classDays: [
        referenceDate.toISOString(),
        referenceDate.add(1, 'day').toISOString(),
      ],
      holidays: [],
      pricePerMonthInCents: 10000,
      referenceDate: referenceDate.toDate(),
      weekdays: [7, 8, 0, 1],
    })

    expect(priceInCents).toEqual(0)
  })

  it('should not be able to calculate monthly payment when the price equals zero', () => {
    const referenceDate = dayjs().set('month', 2)

    const priceInCents = calculateMonthlyPayment({
      classDays: [
        referenceDate.toISOString(),
        referenceDate.add(1, 'day').toISOString(),
      ],
      holidays: [],
      pricePerMonthInCents: 0,
      referenceDate: referenceDate.toDate(),
      weekdays: [1, 3, 5],
    })

    expect(priceInCents).toEqual(0)
  })

  it('should not be able to calculate monthly payment when the price is less than zero', () => {
    const referenceDate = dayjs().set('month', 2)

    const priceInCents = calculateMonthlyPayment({
      classDays: [
        referenceDate.toISOString(),
        referenceDate.add(1, 'day').toISOString(),
      ],
      holidays: [],
      pricePerMonthInCents: -10000,
      referenceDate: referenceDate.toDate(),
      weekdays: [1, 3, 5],
    })

    expect(priceInCents).toEqual(0)
  })

  it('should not be able to calculate monthly payment when receiving a class day outside the reference date', () => {
    const referenceDate = dayjs().set('month', 2)

    const priceInCents = calculateMonthlyPayment({
      classDays: [
        referenceDate.subtract(1, 'month').toISOString(),
        referenceDate.toISOString(),
        referenceDate.add(1, 'day').toISOString(),
      ],
      holidays: [],
      pricePerMonthInCents: 10000,
      referenceDate: referenceDate.toDate(),
      weekdays: [1, 3, 5],
    })

    expect(priceInCents).toEqual(0)
  })
})
