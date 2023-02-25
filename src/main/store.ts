import Store from 'electron-store'

type StoryType = {
  bounds?: {
    width: number
    height: number
    x: number
    y: number
  }
  yearsWithHolidaysFound: number[]
}

export const store = new Store<StoryType>({
  defaults: {
    bounds: undefined,
    yearsWithHolidaysFound: [],
  },
})

console.log(store.path)
