import { grid, math, text } from "@/utils"

const getRolls = (input: string): Map<string, Record<"c" | "r", number>> =>
    new Map(
        grid
            .map(text.grid(input), (cell, { c, r }) => ({ cell, c, r }))
            .flat()
            .filter(({ cell }) => cell === "@")
            .map(({ c, r }) => [`${r}_${c}`, { c, r }]),
    )

const getAccessible = (
    rolls: Map<string, Record<"c" | "r", number>>,
    moves: number,
): number => {
    const toKeep = [...rolls.values()].filter(
        ({ c, r }) =>
            math.count(Object.values(grid.square({ c, r })), (sibling) =>
                rolls.has(`${sibling.r}_${sibling.c}`),
            ) >= 4,
    )

    return toKeep.length === rolls.size || moves === 0 ?
            0
        :   rolls.size -
                toKeep.length +
                getAccessible(
                    new Map(toKeep.map(({ c, r }) => [`${r}_${c}`, { c, r }])),
                    moves - 1,
                )
}

export const part01 = (input: string): number =>
    getAccessible(getRolls(input), 1)

export const part02 = (input: string): number =>
    getAccessible(getRolls(input), Infinity)
