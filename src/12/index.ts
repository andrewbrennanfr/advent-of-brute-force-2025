import { dev, grid, list, text } from "@/utils"

const getShapes = (input: string): grid.Grid<string>[] =>
    input
        .trim()
        .split("\n\n")
        .slice(0, -1)
        .map(text.grid)
        .map((grid) => grid.slice(1))

const getTrees = (
    input: string,
): {
    amounts: number[]
    spaces: grid.Grid<string>
    size: { cols: number; rows: number }
}[] =>
    text
        .lines(list.get(input.trim().split("\n\n"), -1))
        .map((line) => line.split(" "))
        .map(([size = dev.error(), ...rest]) => ({
            amounts: rest.map(Number),
            size: {
                cols: +list.get(size.slice(0, -1).split("x"), 0),
                rows: +list.get(size.slice(0, -1).split("x"), 1),
            },
        }))
        .map(({ amounts, size }) => ({
            amounts,
            spaces: Array(size.rows)
                .fill(null)
                .map(() =>
                    Array(size.cols)
                        .fill(null)
                        .map(() => "."),
                ),
            size,
        }))

const isFittingUnderTree = (
    tree: {
        amounts: number[]
        spaces: grid.Grid<string>
        size: { cols: number; rows: number }
    },
    shapes: grid.Grid<string>[],
): boolean => {
    const expected = tree.amounts.map((amount, i) =>
        Array(amount)
            .fill(null)
            .map(() => list.get(shapes, i)),
    )
    const flatExpected = expected.flat(1)

    const hashes = flatExpected
        .flat()
        .flat()
        .filter((cell) => cell === "#")

    // Not enough spaces at all... we can never fit
    if (tree.spaces.flat().length < hashes.length) return false

    // If there's plenty of space... we can always fit
    if (
        Math.floor(tree.size.cols / 3) * Math.floor(tree.size.rows / 3) >=
        flatExpected.length
    )
        return true

    return false
}

export const part01 = (input: string): number => {
    const shapes = getShapes(input)
    const trees = getTrees(input)
    const fittingTrees = trees.filter((tree) =>
        isFittingUnderTree(tree, shapes),
    )

    return fittingTrees.length
}

export const part02 = (input: string): number => {
    const shapes = getShapes(input)

    return shapes.length
}
