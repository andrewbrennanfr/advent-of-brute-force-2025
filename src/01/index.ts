import { list, math, text } from "@/utils"

const getClicks = (rotations: number[]): number[] =>
    rotations.reduce(
        (clicks, rotation) => [...clicks, list.at(clicks, -1) + rotation],
        [50],
    )

const getCycles = (prevClick: number, nextClick: number): number =>
    prevClick === nextClick ? 0 : (
        +math.isDivisible(prevClick, 100) +
        getCycles(prevClick + (prevClick < nextClick ? 1 : -1), nextClick)
    )

const getRotations = (input: string): number[] =>
    text.lines(input).map((line) => +line.replace("L", "-").replace("R", "+"))

export const part01 = (input: string): number =>
    math.count(getClicks(getRotations(input)), (click) =>
        math.isDivisible(click, 100),
    )

export const part02 = (input: string): number =>
    math.sum(
        getClicks(getRotations(input)).map((click, i, clicks) =>
            !i ? 0 : getCycles(list.at(clicks, i - 1), click),
        ),
    )
