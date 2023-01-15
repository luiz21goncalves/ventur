import { atom, useAtom, useSetAtom } from 'jotai'

const selectedDate = atom(new Date())

export const useCalendarSelectedDate = () => useAtom(selectedDate)

export const useSetCalendarSelectedDate = () => useSetAtom(selectedDate)
