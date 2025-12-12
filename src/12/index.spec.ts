import { part01, part02 } from "@/12"
import { EXAMPLE_01 } from "@/12/example"
import { INPUT_01 } from "@/12/input"
import { describe, expect, test } from "bun:test"

describe("12", () => {
    describe("part01", () => {
        test.skip("EXAMPLE_01", () => {
            expect(part01(EXAMPLE_01)).toEqual(2)
        })

        test("INPUT_01", () => {
            expect(part01(INPUT_01)).toEqual(422)
        })
    })

    describe("part02", () => {
        test.todo("EXAMPLE_01", () => {
            expect(part02(EXAMPLE_01)).toEqual(Infinity)
        })

        test.todo("INPUT_01", () => {
            expect(part02(INPUT_01)).toEqual(Infinity)
        })
    })
})
