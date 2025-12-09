import { part01, part02 } from "@/09"
import { EXAMPLE_01 } from "@/09/example"
import { INPUT_01 } from "@/09/input"
import { describe, expect, test } from "bun:test"

describe("09", () => {
    describe("part01", () => {
        test("EXAMPLE_01", () => {
            expect(part01(EXAMPLE_01)).toEqual(50)
        })

        test("INPUT_01", () => {
            expect(part01(INPUT_01)).toEqual(4781377701)
        })
    })

    describe("part02", () => {
        test("EXAMPLE_01", () => {
            expect(part02(EXAMPLE_01)).toEqual(24)
        })

        test("INPUT_01", () => {
            expect(part02(INPUT_01)).toEqual(1470616992)
        })
    })
})
