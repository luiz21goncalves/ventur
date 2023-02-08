import { DexieHolidaysRepository } from './dexie-holidays-repository'
import { DexieStudentsRepository } from './dexie-students-repository'

const dexieStudentsRepository = new DexieStudentsRepository()
const dexieHolidaysRepository = new DexieHolidaysRepository()

export { dexieHolidaysRepository, dexieStudentsRepository }
