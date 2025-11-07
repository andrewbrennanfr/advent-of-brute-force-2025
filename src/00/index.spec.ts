import { part01, part02 } from "@/00"
import { EXAMPLE_01 } from "@/00/example"
import { INPUT_01 } from "@/00/input"
import { describe, expect, test } from "bun:test"

describe.skip("00", () => {
    describe("part01", () => {
        test("EXAMPLE_01", () => {
            expect(part01(EXAMPLE_01)).toEqual(Infinity)
        })

        test.todo("INPUT_01", () => {
            expect(part01(INPUT_01)).toEqual(Infinity)
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
