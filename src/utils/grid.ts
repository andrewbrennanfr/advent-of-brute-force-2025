import { list } from "@/utils"

export const area = (left: Position, right: Position): number =>
    (manhattan(left.r, right.r) + 1) * (manhattan(left.c, right.c) + 1)

export const clockwise = <T>(
    [first = [], ...grid]: Grid<T>,
    degrees = 90,
): Grid<T> => {
    if (degrees === 0) return [first, ...grid]

    return clockwise(
        first.map((cell, index) =>
            [cell, ...grid.map((row) => list.get(row, index))].toReversed(),
        ),
        degrees - 90,
    )
}

export const cross = ({ c, r }: Position): Cross => ({
    n: { r: r - 1, c },
    e: { r, c: c + 1 },
    s: { r: r + 1, c },
    w: { r, c: c - 1 },
})

export type Cross = Record<"n" | "e" | "s" | "w", Position>

export const get = <T>(
    grid: Grid<T>,
    { c, r }: Record<"c" | "r", number>,
): T | null => grid[r]?.[c] ?? null

export type Grid<T> = T[][]

export const join = <T>(grid: Grid<T>): string =>
    grid.map((row) => row.join("")).join("\n")

export const manhattan = (left: number, right: number): number =>
    Math.abs(left - right)

export const map = <T, U>(
    grid: Grid<T>,
    callback: (value: T, position: Position, grid: Grid<T>) => U,
): Grid<U> =>
    grid.map((row, r) => row.map((value, c) => callback(value, { c, r }, grid)))

export const path = (
    current: Position[],
    direction: "n" | "e" | "s" | "w",
    distance: number,
): Position[] => pathUntil(current, direction, (_, dist) => dist === distance)

export const pathUntil = (
    current: Position[],
    direction: "n" | "e" | "s" | "w",
    stop: ({ c, r }: Position, distance: number) => boolean,
    distance = 0,
): Position[] =>
    stop(list.get(current, -1), distance) ? current : (
        pathUntil(
            [...current, cross(list.get(current, -1))[direction]],
            direction,
            stop,
            distance + 1,
        )
    )

export type Position = Record<"c" | "r", number>

export const print = <T>(grid: Grid<T>): Grid<T> => {
    console.log(join(grid))

    return grid
}

export const square = ({ c, r }: Position): Square => ({
    ...cross({ c, r }),
    ne: { r: r - 1, c: c + 1 },
    se: { r: r + 1, c: c + 1 },
    sw: { r: r + 1, c: c - 1 },
    nw: { r: r - 1, c: c - 1 },
})

export type Square = Cross & Record<"ne" | "se" | "sw" | "nw", Position>
