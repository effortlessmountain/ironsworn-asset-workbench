import sanitize from './sanitize'

describe("sanitizing html input", () => {
    it("sanitizes html input", () => {
        const text = `<img src="dangerous place">some text here`

        const result = sanitize(text)

        expect(result).toBe('some text here')
    })
    it("allows em, ul, and li", () => {
        const text = "<ul><li>The <em>best</em> ability</li></ul>"

        const result = sanitize(text)

        expect(result).toBe(text)
    })
    it("does not allow attributes", () => {
        const text = `<em style="color:red;">best</em>`

        const result = sanitize(text)

        expect(result).toBe(`<em>best</em>`)
    })
})