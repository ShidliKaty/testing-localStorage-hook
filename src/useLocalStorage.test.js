import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import {useLocalStorage} from "./useLocalStorage"


describe("#useLocalStorage", () => {
    function renderLocalStorageHook(key, initialValue) {
        return renderHook(({key, initialValue}) => useLocalStorage(key, initialValue), {initialProps: {key, initialValue}})
    }

    afterEach(() => {
        localStorage.clear()
    })
    
    it("should use the initialValue passed to the hook and store it in localStorage", () => {
        const key = "key"
        const initialValue = "initial"
        const {result} = renderLocalStorageHook(key, initialValue)

        expect(result.current[0]).toBe(initialValue)
        expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
    })
    it("should use the initialValue as a function passed to the hook and store it in localStorage", () => {
        const key = "key"
        const initialValue = "initial2"
        const {result} = renderLocalStorageHook(key, () => initialValue)

        expect(result.current[0]).toBe(initialValue)
        expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
    })
    it("should update localStorage when setValue is called", () => {
        const key = "key"
        const initialValue = "initial"
        const {result} = renderLocalStorageHook(key, initialValue)

        const newValue = "new"
        act(() => result.current[1](newValue)) //wait untill all state variables to be changed and then do further actions

        expect(result.current[0]).toBe(newValue)
        expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue))
    })
})