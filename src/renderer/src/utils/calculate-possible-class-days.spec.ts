import dayjs from 'dayjs'
import { describe, it } from 'vitest'

import { calculatePossibleClassDays } from './calculate-possible-class-days'

describe('calculatePossibleClassDays', () => {
  it('should be able to calculate possible class days when receiving only Sunday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [0],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 5).toDate(),
      firstMonthDay.set('date', 12).toDate(),
      firstMonthDay.set('date', 19).toDate(),
      firstMonthDay.set('date', 26).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(4)
  })

  it('should be able to calculate possible class days when receiving only Monday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [1],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 6).toDate(),
      firstMonthDay.set('date', 13).toDate(),
      firstMonthDay.set('date', 20).toDate(),
      firstMonthDay.set('date', 27).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(4)
  })

  it('should be able to calculate possible class days when receiving only Tuesday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [2],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 7).toDate(),
      firstMonthDay.set('date', 14).toDate(),
      firstMonthDay.set('date', 21).toDate(),
      firstMonthDay.set('date', 28).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(4)
  })

  it('should be able to calculate possible class days when receiving only Wednesday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [3],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 1).toDate(),
      firstMonthDay.set('date', 8).toDate(),
      firstMonthDay.set('date', 15).toDate(),
      firstMonthDay.set('date', 22).toDate(),
      firstMonthDay.set('date', 29).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(5)
  })

  it('should be able to calculate possible class days when receiving only Thursday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [4],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 2).toDate(),
      firstMonthDay.set('date', 9).toDate(),
      firstMonthDay.set('date', 16).toDate(),
      firstMonthDay.set('date', 23).toDate(),
      firstMonthDay.set('date', 30).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(5)
  })

  it('should be able to calculate possible class days when receiving only Friday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [5],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 3).toDate(),
      firstMonthDay.set('date', 10).toDate(),
      firstMonthDay.set('date', 17).toDate(),
      firstMonthDay.set('date', 24).toDate(),
      firstMonthDay.set('date', 31).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(5)
  })

  it('should be able to calculate possible class days when receiving only Saturday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [6],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 4).toDate(),
      firstMonthDay.set('date', 11).toDate(),
      firstMonthDay.set('date', 18).toDate(),
      firstMonthDay.set('date', 25).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(4)
  })

  it('should be able to calculate possible class days when receiving Sunday and Saturday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [0, 6],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 4).toDate(),
      firstMonthDay.set('date', 5).toDate(),
      firstMonthDay.set('date', 11).toDate(),
      firstMonthDay.set('date', 12).toDate(),
      firstMonthDay.set('date', 18).toDate(),
      firstMonthDay.set('date', 19).toDate(),
      firstMonthDay.set('date', 25).toDate(),
      firstMonthDay.set('date', 26).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(8)
  })

  it('should be able to calculate possible class days when receiving Sunday, Wednesday, and Saturday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [0, 3, 6],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 1).toDate(),
      firstMonthDay.set('date', 4).toDate(),
      firstMonthDay.set('date', 5).toDate(),
      firstMonthDay.set('date', 8).toDate(),
      firstMonthDay.set('date', 11).toDate(),
      firstMonthDay.set('date', 12).toDate(),
      firstMonthDay.set('date', 15).toDate(),
      firstMonthDay.set('date', 18).toDate(),
      firstMonthDay.set('date', 19).toDate(),
      firstMonthDay.set('date', 22).toDate(),
      firstMonthDay.set('date', 25).toDate(),
      firstMonthDay.set('date', 26).toDate(),
      firstMonthDay.set('date', 29).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(13)
  })

  it('should be able to calculate possible class days when receiving Sunday, Monday, Wednesday, and Saturday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [0, 1, 3, 6],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 1).toDate(),
      firstMonthDay.set('date', 4).toDate(),
      firstMonthDay.set('date', 5).toDate(),
      firstMonthDay.set('date', 6).toDate(),
      firstMonthDay.set('date', 8).toDate(),
      firstMonthDay.set('date', 11).toDate(),
      firstMonthDay.set('date', 12).toDate(),
      firstMonthDay.set('date', 13).toDate(),
      firstMonthDay.set('date', 15).toDate(),
      firstMonthDay.set('date', 18).toDate(),
      firstMonthDay.set('date', 19).toDate(),
      firstMonthDay.set('date', 20).toDate(),
      firstMonthDay.set('date', 22).toDate(),
      firstMonthDay.set('date', 25).toDate(),
      firstMonthDay.set('date', 26).toDate(),
      firstMonthDay.set('date', 27).toDate(),
      firstMonthDay.set('date', 29).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(17)
  })

  it('should be able to calculate possible class days when receiving Sunday, Monday, Wednesday, Friday,and Saturday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [0, 1, 3, 5, 6],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 1).toDate(),
      firstMonthDay.set('date', 3).toDate(),
      firstMonthDay.set('date', 4).toDate(),
      firstMonthDay.set('date', 5).toDate(),
      firstMonthDay.set('date', 6).toDate(),
      firstMonthDay.set('date', 8).toDate(),
      firstMonthDay.set('date', 10).toDate(),
      firstMonthDay.set('date', 11).toDate(),
      firstMonthDay.set('date', 12).toDate(),
      firstMonthDay.set('date', 13).toDate(),
      firstMonthDay.set('date', 15).toDate(),
      firstMonthDay.set('date', 17).toDate(),
      firstMonthDay.set('date', 18).toDate(),
      firstMonthDay.set('date', 19).toDate(),
      firstMonthDay.set('date', 20).toDate(),
      firstMonthDay.set('date', 22).toDate(),
      firstMonthDay.set('date', 24).toDate(),
      firstMonthDay.set('date', 25).toDate(),
      firstMonthDay.set('date', 26).toDate(),
      firstMonthDay.set('date', 27).toDate(),
      firstMonthDay.set('date', 29).toDate(),
      firstMonthDay.set('date', 31).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(22)
  })

  it('should be able to calculate possible class days when receiving Sunday, Monday, Tuesday, Wednesday, Friday,and Saturday', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [0, 1, 2, 3, 5, 6],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 1).toDate(),
      firstMonthDay.set('date', 3).toDate(),
      firstMonthDay.set('date', 4).toDate(),
      firstMonthDay.set('date', 5).toDate(),
      firstMonthDay.set('date', 6).toDate(),
      firstMonthDay.set('date', 7).toDate(),
      firstMonthDay.set('date', 8).toDate(),
      firstMonthDay.set('date', 10).toDate(),
      firstMonthDay.set('date', 11).toDate(),
      firstMonthDay.set('date', 12).toDate(),
      firstMonthDay.set('date', 13).toDate(),
      firstMonthDay.set('date', 14).toDate(),
      firstMonthDay.set('date', 15).toDate(),
      firstMonthDay.set('date', 17).toDate(),
      firstMonthDay.set('date', 18).toDate(),
      firstMonthDay.set('date', 19).toDate(),
      firstMonthDay.set('date', 20).toDate(),
      firstMonthDay.set('date', 21).toDate(),
      firstMonthDay.set('date', 22).toDate(),
      firstMonthDay.set('date', 24).toDate(),
      firstMonthDay.set('date', 25).toDate(),
      firstMonthDay.set('date', 26).toDate(),
      firstMonthDay.set('date', 27).toDate(),
      firstMonthDay.set('date', 28).toDate(),
      firstMonthDay.set('date', 29).toDate(),
      firstMonthDay.set('date', 31).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(26)
  })

  it('should be able to calculate possible class days when receiving all weekdays', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [0, 1, 2, 3, 4, 5, 6],
    })

    expect(possibleClassDays).toStrictEqual([
      firstMonthDay.set('date', 1).toDate(),
      firstMonthDay.set('date', 2).toDate(),
      firstMonthDay.set('date', 3).toDate(),
      firstMonthDay.set('date', 4).toDate(),
      firstMonthDay.set('date', 5).toDate(),
      firstMonthDay.set('date', 6).toDate(),
      firstMonthDay.set('date', 7).toDate(),
      firstMonthDay.set('date', 8).toDate(),
      firstMonthDay.set('date', 9).toDate(),
      firstMonthDay.set('date', 10).toDate(),
      firstMonthDay.set('date', 11).toDate(),
      firstMonthDay.set('date', 12).toDate(),
      firstMonthDay.set('date', 13).toDate(),
      firstMonthDay.set('date', 14).toDate(),
      firstMonthDay.set('date', 15).toDate(),
      firstMonthDay.set('date', 16).toDate(),
      firstMonthDay.set('date', 17).toDate(),
      firstMonthDay.set('date', 18).toDate(),
      firstMonthDay.set('date', 19).toDate(),
      firstMonthDay.set('date', 20).toDate(),
      firstMonthDay.set('date', 21).toDate(),
      firstMonthDay.set('date', 22).toDate(),
      firstMonthDay.set('date', 23).toDate(),
      firstMonthDay.set('date', 24).toDate(),
      firstMonthDay.set('date', 25).toDate(),
      firstMonthDay.set('date', 26).toDate(),
      firstMonthDay.set('date', 27).toDate(),
      firstMonthDay.set('date', 28).toDate(),
      firstMonthDay.set('date', 29).toDate(),
      firstMonthDay.set('date', 30).toDate(),
      firstMonthDay.set('date', 31).toDate(),
    ])
    expect(possibleClassDays.length).toEqual(31)
  })

  it('should not be able to calculate possible class days when receiving invalid weekdays', () => {
    const firstMonthDay = dayjs(new Date(2023, 2)).startOf('month')

    const possibleClassDays = calculatePossibleClassDays({
      date: firstMonthDay.toDate(),
      weekdays: [0, 1, 7],
    })

    expect(possibleClassDays).toStrictEqual([])
    expect(possibleClassDays.length).toEqual(0)
  })
})
