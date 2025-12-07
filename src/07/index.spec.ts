import { part01, part02 } from "@/07"
import { EXAMPLE_01 } from "@/07/example"
import { INPUT_01 } from "@/07/input"
import { describe, expect, test } from "bun:test"

describe("07", () => {
    describe("part01", () => {
        test("EXAMPLE_01", () => {
            expect(part01(EXAMPLE_01)).toEqual(21)
        })

        test("INPUT_01", () => {
            expect(part01(INPUT_01)).toEqual(1662)
        })
    })

    describe("part02", () => {
        test("EXAMPLE_01", () => {
            expect(part02(EXAMPLE_01)).toEqual(40)
        })

        test("INPUT_01", () => {
            expect(part02(INPUT_01)).toEqual(40941112789504)
        })
    })
})
