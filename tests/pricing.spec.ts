import '@testing-library/jest-dom'
import OfferForm from '../src/components/OrderForm/Index.svelte'
import { Options } from '../src/components/OrderForm/models'
import { fireEvent, render } from '@testing-library/svelte'

describe('Price', () => {
  let customOptions: Options = {
    JobBoards: [
      'Job boards range',
      [
        ['None', 0],
        ['1 job board', 194],
        ['2 job boards', 392],
        ['3 job boards', 580]
      ]
    ],
    NumberOfBumps: [
      'Number of bumps in job boards',
      [
        ['1 bump', 1],
        ['2 bumps', 1.33],
        ['3 bumps', 1.74]
      ]
    ],
    SocialMedias: [
      'Social media & forums',
      [
        ['None', 0],
        ['1 facebook group', 5],
        ['2 facebook groups, 1 slack community', 20]
      ]
    ],
    HeadHunter: ['Head hunter']
  }

  it('first step price is by default', async () => {
    // Arrange + Act
    const offer = [['a1', 20], ['a2', 40]]
    const cut = render(OfferForm, { steps: offer })
    // Assert
    expect(cut.getByText('20 €')).toBeInTheDocument()
  })

  it('when range is changed then price is changed accordingly', async () => {
    // Arrange
    const offer = [['a1', 20], ['a2', 40]]
    const cut = render(OfferForm, { steps: offer })
    // Act
    await fireEvent.input(cut.getByRole('slider'), { target: { value: 1 } })
    // Assert
    expect(cut.getByText('40 €')).toBeInTheDocument()
  })

  it('head hunter makes individual quote', async () => {
    // Arrange

    const cut = render(OfferForm, { customOptions: customOptions })
    await fireEvent.click(cut.getByText('customize'))
    // Act
    await fireEvent.input(cut.getAllByRole('slider')[0], { target: { value: 1 } })
    await fireEvent.click(cut.getByRole("checkbox", { checked: false }))
    // Assert
    expect(cut.getByText('Individual quote')).toBeInTheDocument()
  })


it('bumps multiplies job offer price', async () => {
  // Arrange
  const cut = render(OfferForm, { customOptions: customOptions })
  await fireEvent.click(cut.getByText('customize'))
  let expectedPrice = `${Math.ceil(392*1.74)} €` 
  // Act
  await fireEvent.input(cut.getAllByRole('slider')[0], { target: { value: 2 } })
  await fireEvent.input(cut.getAllByRole('slider')[1], { target: { value: 2 } })

  // Assert
  expect(cut.getByText(expectedPrice)).toBeInTheDocument()
})
})

