export type Holiday = {
  id: string
  name: string
  date: string
}

export type Student = {
  id: string
  name: string
  birthdate?: string
  classes_per_week: number
  price_per_month_in_cents: number
  weekdays: number[]
}

export type Attendance = {
  id: string
  date: string
  student_id: string
  presence: boolean
}

/**
 * RESQUEST
 */

export type FetchYearWithHolidaysFoundRequest = {
  year: number
}

export type SaveYearWithHolidaysFoundRequest = {
  year: number
}

/**
 * RESPONSE
 */

export type FetchYearWithHolidaysFoundResponse = {
  data: boolean
}
