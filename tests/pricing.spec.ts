import '@testing-library/jest-dom'
import OfferForm from '../src/components/OrderForm/Index.svelte'
import { Option } from '../src/components/OrderForm/models'
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

  it('custom offer can be priced', async () => {
    // Arrange
    let customOptions: Option[] = [
      ['Job boards range', [
        ['None', 0]
        , ['1 job board', 10]
        , ['3 job boards', 30]
      ]],
      ['Head hunter', false, 90]
    ]
    const cut = render(OfferForm, { customOptions: customOptions })
    await fireEvent.click(cut.getByText('customize'))
    // Act
    await fireEvent.input(cut.getByRole('slider'), { target: { value: 1 } })
    await fireEvent.click(cut.getByRole("checkbox", {checked: false}))
    // Assert
    expect(cut.getByText('100 €')).toBeInTheDocument()
  })
})