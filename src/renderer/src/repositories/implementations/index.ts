import { DexieAttendanceRepository } from './dexie-attendance-repository'
import { DexieHolidaysRepository } from './dexie-holidays-repository'
import { DexieStudentsRepository } from './dexie-students-repository'

const dexieStudentsRepository = new DexieStudentsRepository()
const dexieHolidaysRepository = new DexieHolidaysRepository()
const dexieAttendanceRepository = new DexieAttendanceRepository()

export {
  dexieAttendanceRepository,
  dexieHolidaysRepository,
  dexieStudentsRepository,
}
