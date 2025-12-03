import { part01, part02 } from "@/03"
import { EXAMPLE_01 } from "@/03/example"
import { INPUT_01 } from "@/03/input"
import { describe, expect, test } from "bun:test"

describe("03", () => {
    describe("part01", () => {
        test("EXAMPLE_01", () => {
            expect(part01(EXAMPLE_01)).toEqual(357)
        })

        test("INPUT_01", () => {
            expect(part01(INPUT_01)).toEqual(17031)
        })
    })

    describe("part02", () => {
        test("EXAMPLE_01", () => {
            expect(part02(EXAMPLE_01)).toEqual(3121910778619)
        })

        test("INPUT_01", () => {
            expect(part02(INPUT_01)).toEqual(168575096286051)
        })
    })
})
