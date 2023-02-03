import { faker } from '@faker-js/faker'
import * as Factory from 'factory.ts'

import { Student } from '@/shared/types'

export const studentFactory = Factory.Sync.makeFactory<Student>({
  birthdate: Factory.each(() => faker.date.birthdate().toISOString()),
  classes_per_month: Factory.each(() => Number(faker.random.numeric(2))),
  classes_per_week: Factory.each(() =>
    Number(
      faker.random.numeric(1, {
        bannedDigits: ['0', '6', '7', '8', '9'],
      }),
    ),
  ),
  id: Factory.each((seqNum) => String(seqNum)),
  name: Factory.each(() => faker.name.fullName()),
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
      .map((_, index) => index + 1),
  ),
})
