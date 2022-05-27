import '@testing-library/jest-dom'
import Upload from '../src/components/Upload.svelte'
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
