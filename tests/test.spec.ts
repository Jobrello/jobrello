import '@testing-library/jest-dom'
import Counter from '../src/components/Counter.svelte'
import { render } from '@testing-library/svelte'

describe('ddd', () => {
  it(`test`, () => {
    const cut = render(Counter)
    // Arrange + Act
    expect(1).toBe(1)
  })
})