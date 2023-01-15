import { faker } from '@faker-js/faker'
import * as Factory from 'factory.ts'

type Student = {
  id: string
  name: string
  classes_per_week: number
  classes_per_month: number
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
  id: Factory.each((seqNum) => String(seqNum)),
  name: Factory.each(() => faker.name.fullName()),
})
