export function formatMonetary(value: number) {
  const formater = Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  })

  return formater
    .format(value)
    .replace(/\xa0/g, ' ')
    .replace(/\u202f/g, ' ')
}
