export type Holiday = {
  id?: number
  name: string
  date: string
}

export type Student = {
  id?: number
  name: string
  birthdate?: string
  classes_per_week: number
  price_per_month_in_cents: number
  weekdays: number[]
}

export type Attendance = {
  id?: number
  date: string
  student_id: number
  presence: boolean
}
