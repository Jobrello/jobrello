import '@testing-library/jest-dom'
import OfferForm from '../src/components/OrderForm/Index.svelte'
import { fireEvent, render } from '@testing-library/svelte'

describe('Price', () => {
  it('first step price is by default', async () => {
    // Arrange + Act
    const offer = [['a1', 20], ['a2', 40]]
    const cut = render(OfferForm, {steps: offer})
    // Assert
    expect(cut.getByText('20 €')).toBeInTheDocument()
  })

  it('when range is changed then price is changed accordingly', async () => {
    // Arrange
    const offer = [['a1', 20], ['a2', 40]]
    const cut = render(OfferForm, { steps: offer })
    // Act
    await fireEvent.input(cut.getByRole('slider'), {target: {value : 1}})
    // Assert
    expect(cut.getByText('40 €')).toBeInTheDocument()
  })
})