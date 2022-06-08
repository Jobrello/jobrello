import '@testing-library/jest-dom'
import OfferForm from '../src/components/OrderForm/Index.svelte'
import { render, fireEvent } from '@testing-library/svelte'
import { inquiry } from '../mocks/data'

const testFile = new File(['(⌐□_□)'], 'chucknorris.png', {
    type: 'image/png'
})
  
const steps: [string, number][]  = [
  ['I like fish and chips', 150]
]

describe('Submitting an Offer', () => {
  it('sends sender, tier, job offer', async () => {
    // Arrange
    const expectedInquiry = 
      [
        [ 'sender', 'TEST@SENDER.COM' ],
        [ 'tier', 'TEST-TIER' ],
        [ 'jobOffer', '[object File]' ]
      ]
    const cut = render(OfferForm, {steps: steps})
    const uploader = cut.getByTestId('file-uploader') as HTMLInputElement
    await fireEvent.change(uploader, { target: { files: [testFile] } })
    // Act
    await fireEvent.click(cut.getByRole('button', {name: 'Submit!'}))
    // Assert
    expect(inquiry.data).toStrictEqual(expectedInquiry)
  })
})