import '@testing-library/jest-dom'
import Upload from '../src/components/Upload.svelte'
import {render, fireEvent} from '@testing-library/svelte'

describe('Upload component', () => {
  it(`When file is dropped, then it can be found in the input`, async () => {
    const testFile = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png'
    })
    const dropFileName = 'Drop job offer here'
    const cut = render(Upload, {dropFileName: 'Drop job offer here'})
    // Act
    fireEvent.drop(cut.getByLabelText(dropFileName), {
      dataTransfer: {files: [testFile]}
    })
    // Assert
    expect(await cut.findByText(testFile.name)).toBeInTheDocument()
  })
})