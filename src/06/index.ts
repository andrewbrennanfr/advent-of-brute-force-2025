import { grid, list, math, text } from "@/utils"

const getOperators = (input: string): string[] =>
    list.get(text.lines(input), -1).split(/ +/)

const getEquations = (input: string): [string, number[]][] => {
    const lines = text.lines(input)
    const numbers = lines
        .slice(0, -1)
        .map((numberLine) => numberLine.trim().split(/ +/))

    return getOperators(input).map((operator, i) => [
        operator,
        numbers.map((numberLine) => +list.get(numberLine, i)),
    ])
}

const getRotatedEquations = (input: string): [string, number[]][] => {
    const rotated = grid.join(
        grid.clockwise(
            input
                .slice(1, -1)
                .split("\n")
                .slice(0, -1)
                .map((line) => line.split("")),
            270,
        ),
    )

    const numberGroups = rotated.split(/\n +\n/)

    return getOperators(input)
        .toReversed()
        .map((operator, i) => [
            operator,
            list.get(numberGroups, i).split("\n").map(Number),
        ])
}

const solveEquation = ([operator, numbers]: [string, number[]]): number =>
    (operator === "+" ? math.sum : math.prod)(numbers)

export const part01 = (input: string): number => {
    const equations = getEquations(input)
    const results = equations.map(solveEquation)

    return math.sum(results)
}

export const part02 = (input: string): number => {
    const equations = getRotatedEquations(input)
    const results = equations.map(solveEquation)

    return math.sum(results)
}
