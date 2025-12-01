import { part01, part02 } from "@/01"
import { EXAMPLE_01 } from "@/01/example"
import { INPUT_01 } from "@/01/input"
import { describe, expect, test } from "bun:test"

describe("01", () => {
    describe("part01", () => {
        test("EXAMPLE_01", () => {
            expect(part01(EXAMPLE_01)).toEqual(3)
        })

        test("INPUT_01", () => {
            expect(part01(INPUT_01)).toEqual(1029)
        })
    })

    describe("part02", () => {
        test("EXAMPLE_01", () => {
            expect(part02(EXAMPLE_01)).toEqual(6)
        })

        test("INPUT_01", () => {
            expect(part02(INPUT_01)).toEqual(5892)
        })
    })
})
