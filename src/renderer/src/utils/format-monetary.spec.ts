import { describe, expect, it } from 'vitest'

import { formatMonetary } from './format-monetary'

describe('formatMonetary', () => {
  it('should be able to format the amount in BRL currency', () => {
    const result = formatMonetary(100)

    expect(result).toEqual('R$ 100,00')
  })

  it('should be able to format the float amount in BRL currency', () => {
    const result = formatMonetary(0.55)

    expect(result).toEqual('R$ 0,55')
  })
})
