import { part01, part02 } from "@/08"
import { EXAMPLE_01 } from "@/08/example"
import { INPUT_01 } from "@/08/input"
import { describe, expect, test } from "bun:test"

describe("08", () => {
    describe("part01", () => {
        test("EXAMPLE_01", () => {
            expect(part01(EXAMPLE_01)).toEqual(40)
        })

        test("INPUT_01", () => {
            expect(part01(INPUT_01, 1000)).toEqual(75582)
        })
    })

    describe("part02", () => {
        test("EXAMPLE_01", () => {
            expect(part02(EXAMPLE_01)).toEqual(25272)
        })

        test("INPUT_01", () => {
            expect(part02(INPUT_01)).toEqual(59039696)
        })
    })
})
