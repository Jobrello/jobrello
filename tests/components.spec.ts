import '@testing-library/jest-dom'
import Upload from '../src/components/OrderForm/Upload.svelte'
import { Options, SelectedOptions } from '../src/components/OrderForm/models'
import InfromativeRange from '../src/components/OrderForm/InfromativeRange.svelte'
import OfferForm from '../src/components/OrderForm/Index.svelte'
import Checkbox from '../src/components/Checkbox.svelte'
import CustomizedOrder from '../src/components/OrderForm/CustomizedOrder.svelte'
import {render, fireEvent} from '@testing-library/svelte'

describe('Upload component', () => {
  it(`When file is dropped, then it can be found in the input`, async () => {
    const testFile = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png'
    })
    const dropFileTitle = 'Drop job offer here'
    const cut = render(Upload, {dropFileTitle})
    const uploader = cut.getByTestId('file-uploader') as HTMLInputElement
    // Act
    await fireEvent.change(uploader, {target: {files: [testFile]}})
    // Assert
    const files = uploader.files as FileList
    expect(await cut.findByText(/chucknorris.png/)).toBeInTheDocument()
    expect(files.length).toEqual(1)
    expect(files[0].name).toBe(testFile.name)
  })
})

it(`When file is dropped, then file-selected event is triggered`, async () => {
  const testFile = new File(['(⌐□_□)'], 'chucknorris.png', {
    type: 'image/png'
  })
  const dropFileTitle = 'Drop job offer here'
  const cut = render(Upload, {dropFileTitle})
  const uploader = cut.getByTestId('file-uploader') as HTMLInputElement
  let isFileSelectedEventTriggered = false
  let onFileSelected = () => isFileSelectedEventTriggered = true
  cut.component.$on('file-selected', onFileSelected)
  // Act
  await fireEvent.change(uploader, {target: {files: [testFile]}})
  // Assert
  expect(isFileSelectedEventTriggered).toBe(true)
})

describe('Informative range component', () => {
  it('When value is changed, the related information is being displayed', async () => {
    // Arrange
    const steps = [
      '1st step'
      , '2nd step'
      , '3rd step'
    ]
    const cut = render(InfromativeRange, { steps })
    // Act
    fireEvent.input(cut.getByRole('slider'), {target: {value : 2}})
    // Assert
    expect(await cut.findByText(steps[2]))
  })
})

describe('Order form component', () => {
  it('can open customization area', async () => {
    // Arrange
    const cut = render(OfferForm)
    // Act
    await fireEvent.click(cut.getByText('customize'))
    // Assert
    expect(cut.getByText('back to classic mode'))
  })
})

describe('Checkbox', () => {
  it('has default value', () => {
    // Arrange + Act
    const cut = render(Checkbox, { checked: true })
    // Assert
    const checkbox = cut.getByRole("checkbox") as HTMLInputElement
    expect(checkbox.checked).toBe(true)
  })

  it('fires change event with checked value', async () => {
    // Arrange
    let actualEvent: any = null
    const cut = render(Checkbox, { checked: false })
    cut.component.$on('change', evt => actualEvent = evt.detail)
    // Act
    await fireEvent.click(cut.getByRole("checkbox", {checked: false}))
    // Assert
    expect(actualEvent).toBe(true)
  })
})

describe('CustomizedOrder', () => {

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

  it('can set ranges and checkboxes in customization area', async () => {
    // Arrange + Act
    const cut = render(CustomizedOrder, { options: customOptions })
    // Assert
    const text = cut.container.textContent
    expect(text).toContain(customOptions.HeadHunter[0])
    expect(text).toContain(customOptions.JobBoards[0])
    expect(text).toContain(customOptions.NumberOfBumps[0])
    expect(text).toContain(customOptions.SocialMedias[0])
  })

  it('it fires change event with selections', async () => {
    // Arrange + Act
    let selections: SelectedOptions = undefined as unknown as SelectedOptions
    const cut = render(CustomizedOrder, { options: customOptions })
    cut.component.$on('change', (e: CustomEvent<SelectedOptions>) => {
      selections = e.detail
    })
    await fireEvent.click(cut.getByRole("checkbox", { checked: false }))
    await fireEvent.input(cut.getAllByRole('slider')[0], {target: {value : 2}})
    // Assert
    expect(selections.HeadHunter).toEqual(true)
    expect(selections.JobBoards[0]).toEqual(customOptions.JobBoards[1][2][0])
    expect(selections.JobBoards[1]).toEqual(customOptions.JobBoards[1][2][1])
  })
})