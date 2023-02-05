export function capitalize(word: string) {
  const firstLetter = word.substring(0, 1).toUpperCase()
  const otherLetters = word.substring(1)

  const capitalizedWord = `${firstLetter}${otherLetters}`

  return capitalizedWord
}
