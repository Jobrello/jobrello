import '@testing-library/jest-dom'
import OfferForm from '../src/components/OrderForm/Index.svelte'
import { render, fireEvent } from '@testing-library/svelte'

const testFile = new File(['(⌐□_□)'], 'chucknorris.png', {
    type: 'image/png'
  })

describe('Submitting an Offer', () => {
  it('when file is uploaded is possible', async () => {
    // Arrange
    const cut = render(OfferForm)
    const uploader = cut.getByTestId('file-uploader') as HTMLInputElement
    await fireEvent.change(uploader, {target: {files: [testFile]}})
    // Act
    // Assert
    throw "Uncomment the below and do dzieła"
    // expect(submittedFile).toBe(testFile)
    // expect(selectedOffer).toEqual(['1 most popular job board in Poland, Facebook group, posters on Polish University of technology.'])
  })
})