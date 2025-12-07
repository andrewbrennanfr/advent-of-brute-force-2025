import { dev, grid, list, text } from "@/utils"

const getManifold = (input: string): grid.Grid<string> => text.grid(input)

const getStart = (manifold: grid.Grid<string>): grid.Position => ({
    c: list.get(manifold, 0).findIndex((cell) => cell === "S"),
    r: 0,
})

const move = (
    manifold: grid.Grid<string>,
    position: grid.Position,
    splits: Map<string, number>,
): number => {
    const nextPosition = list.get(grid.path([position], "s", 1), -1)
    const nextPositionValue = grid.get(manifold, nextPosition)
    const nextPositionHash = `${nextPosition.r}_${nextPosition.c}`

    if (nextPositionValue === ".") return move(manifold, nextPosition, splits)

    if (nextPositionValue === "^") {
        if (splits.has(nextPositionHash))
            return splits.get(nextPositionHash) ?? dev.error()

        const leftPosition = list.get(grid.path([nextPosition], "w", 1), -1)
        const rightPosition = list.get(grid.path([nextPosition], "e", 1), -1)

        const result =
            move(manifold, rightPosition, splits) +
            move(manifold, leftPosition, splits)

        splits.set(nextPositionHash, result)

        return result
    }

    return 1
}

export const part01 = (input: string): number => {
    const manifold = getManifold(input)
    const start = getStart(manifold)
    const splits = new Map<string, number>()

    move(manifold, start, splits)

    return splits.size
}

export const part02 = (input: string): number => {
    const manifold = getManifold(input)
    const start = getStart(manifold)

    return move(manifold, start, new Map())
}
