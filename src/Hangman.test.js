const Hangman = require("./Hangman")
// @ponicode
describe("guessedWord", () => {
    let inst

    beforeEach(() => {
        inst = new Hangman.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.guessedWord()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("handleGuess", () => {
    let inst

    beforeEach(() => {
        inst = new Hangman.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.handleGuess({ target: { value: "elio@example.com" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.handleGuess({ target: { value: "Dillenberg" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.handleGuess({ target: { value: "Elio" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.handleGuess(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
