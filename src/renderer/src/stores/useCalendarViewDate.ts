import { atom, useAtom, useSetAtom } from 'jotai'

const viewDate = atom(new Date())

export const useCalendarViewDate = () => useAtom(viewDate)

export const useSetCalendarViewDate = () => useSetAtom(viewDate)
