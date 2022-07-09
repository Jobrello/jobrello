import '@testing-library/jest-dom'
import OfferForm from '../src/components/OrderForm/Index.svelte'
import { render, fireEvent } from '@testing-library/svelte'
import { inquiry } from '../mocks/data'
import { Options } from '../src/components/OrderForm/models'

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
        , ['inquiry', `custom: false; step: 0; boards: None; bumps: 1 bump; socials: None; headHunter: false; price: ${steps[0][1]} €` ]
        , ['jobOffer', '[object File]']
      ]
    const cut = render(OfferForm, {steps: steps})
    const uploader = cut.getByTestId('file-uploader') as HTMLInputElement
    await fireEvent.change(uploader, { target: { files: [testFile] } })
    // Act
    await fireEvent.click(cut.getByRole('button', {name: 'Submit!'}))
    // Assert
    expect(inquiry.data).toEqual(expectedInquiry)
  })

  it('sends sender, job offer and inquiry from customized plan', async () => {
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
    // Arrange
    const expectedInquiry =
      [
        ['sender', 'TEST@SENDER.COM']
        , [ 'inquiry', `custom: true; step: 0; boards: 1 job board; bumps: 2 bumps; socials: None; headHunter: false; price: ${Math.ceil(194*1.33)} €` ]
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