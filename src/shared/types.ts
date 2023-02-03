export type Holiday = {
  id?: number
  name: string
  date: string
}

export type Student = {
  id: string
  name: string
  birthdate?: string
  classes_per_week: number
  classes_per_month: number
  price_per_month: string
  weekdays: number[]
}
