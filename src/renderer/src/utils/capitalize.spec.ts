import { describe, expect, it } from 'vitest'

import { capitalize } from './capitalize'

describe('capitalize', () => {
  it('should be able to capitalize a word', () => {
    const capitalizedWord = capitalize('aluno 01')

    expect(capitalizedWord).toEqual('Aluno 01')
  })
})
