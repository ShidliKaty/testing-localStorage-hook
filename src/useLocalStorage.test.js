import { renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {useLocalStorage} from "./useLocalStorage"


describe("#useLocalStorage", () => {
    function renderLocalStorageHook(key, initialValue) {
        return renderHook(({key, initialValue}) => useLocalStorage(key, initialValue), {initialProps: {key, initialValue}})
    }
    it("should use the initialValue passed to the hook and store it in localStorage", () => {
        const key = "key"
        const initialValue = "initial"
        const {result} = renderLocalStorageHook(key, initialValue)

        expect(result.current[0]).toBe(initialValue)
        expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
    })
    it("should use the initialValue as a function passed to the hook and store it in localStorage", () => {
        const key = "key"
        const initialValue = "initial"
        const {result} = renderLocalStorageHook(key, () => initialValue)

        expect(result.current[0]).toBe(initialValue)
        expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
    })
})