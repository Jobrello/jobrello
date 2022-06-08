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
  it('sends sender, job offer and inquiry from standard plan', async () => {
    // Arrange
    const expectedInquiry =
      [
        ['sender', 'TEST@SENDER.COM']
        , [ 'inquiry', 'I like fish and chips | 150' ]
        , ['jobOffer', '[object File]']
      ]
    const cut = render(OfferForm, {steps: steps})
    const uploader = cut.getByTestId('file-uploader') as HTMLInputElement
    await fireEvent.change(uploader, { target: { files: [testFile] } })
    // Act
    await fireEvent.click(cut.getByRole('button', {name: 'Submit!'}))
    // Assert
    expect(inquiry.data).toStrictEqual(expectedInquiry)
  })

  it('sends sender, job offer and inquiry from customized plan', async () => {
    let customOptions = [
      ['Job boards 1', [
        ['None', 0]
        , ['1a job board', 10]
        , ['2a job boards', 20]
      ]],
      ['Job boards 2', [
        ['None', 0]
        , ['1b job board', 15]
        , ['2b job boards', 25]
      ]]
    ]
    // Arrange
    const expectedInquiry =
      [
        ['sender', 'TEST@SENDER.COM']
        , [ 'inquiry', '1a job board | 10 | 1b job board | 15' ]
        , ['jobOffer', '[object File]']
      ]
    const cut = render(OfferForm, {customOptions: customOptions})
    const uploader = cut.getByTestId('file-uploader') as HTMLInputElement
    await fireEvent.change(uploader, { target: { files: [testFile] } })
    await fireEvent.click(cut.getByText('customize'))
    await fireEvent.input(cut.getAllByRole('slider')[0], {target: {value : 1}})
    await fireEvent.input(cut.getAllByRole('slider')[1], {target: {value : 1}})
    // Act
    await fireEvent.click(cut.getByRole('button', {name: 'Submit!'}))
    // Assert
    expect(inquiry.data).toStrictEqual(expectedInquiry)
  })
})