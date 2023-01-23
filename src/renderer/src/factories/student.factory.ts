import { faker } from '@faker-js/faker'
import * as Factory from 'factory.ts'

type Student = {
  id: string
  name: string
  email?: string
  password?: string
  classes_per_week: number
  classes_per_month: number
  price_per_month: string
  weekdays: number[]
}

export const studentFactory = Factory.Sync.makeFactory<Student>({
  classes_per_month: Factory.each(() => Number(faker.random.numeric(2))),
  classes_per_week: Factory.each(() =>
    Number(
      faker.random.numeric(1, {
        bannedDigits: ['0', '6', '7', '8', '9'],
      }),
    ),
  ),
  email: Factory.each(() => faker.internet.email()),
  id: Factory.each((seqNum) => String(seqNum)),
  name: Factory.each(() => faker.name.fullName()),
  password: Factory.each(() => faker.internet.password()),
  price_per_month: Factory.each(() => faker.commerce.price(100, 200)),
  weekdays: Factory.each(() =>
    faker.datatype
      .array(
        Number(
          faker.random.numeric(1, {
            bannedDigits: ['0', '1', '6', '7', '8', '9'],
          }),
        ),
      )
      .map((_, index) => index),
  ),
})
