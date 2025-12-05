import { part01, part02 } from "@/05"
import { EXAMPLE_01 } from "@/05/example"
import { INPUT_01 } from "@/05/input"
import { describe, expect, test } from "bun:test"

describe("05", () => {
    describe("part01", () => {
        test("EXAMPLE_01", () => {
            expect(part01(EXAMPLE_01)).toEqual(3)
        })

        test("INPUT_01", () => {
            expect(part01(INPUT_01)).toEqual(661)
        })
    })

    describe("part02", () => {
        test("EXAMPLE_01", () => {
            expect(part02(EXAMPLE_01)).toEqual(14)
        })

        test("INPUT_01", () => {
            expect(part02(INPUT_01)).toEqual(359526404143208)
        })
    })
})
