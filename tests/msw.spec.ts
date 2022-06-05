import '@testing-library/jest-dom'

describe('msw', () => {
    it('works, hello world is returned', async () => {
        const response = await fetch("http://localhost:5000/api/test")
        const message = await response.json() as { message: string }
        expect(message.message).toBe("Hello World")
    })
})