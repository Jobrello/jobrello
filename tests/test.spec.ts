import '@testing-library/jest-dom'
import Upload from '../src/components/Upload.svelte'
import InfromativeRange from '../src/components/InfromativeRange.svelte'
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
    fireEvent.input(cut.getByTestId('slider'), {target: {value : 2}})
    // Assert
    expect(await cut.findByText(steps[2]))
  })
})
