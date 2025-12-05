import { dev, list, math, text } from "@/utils"

const getIds = (input: string): number[] =>
    text.lines(list.get(input.trim().split("\n\n"), 1)).map(Number)

const getRanges = (input: string): [number, number][] =>
    text
        .lines(list.get(input.trim().split("\n\n"), 0))
        .map((line) => line.split("-"))
        .map(([left = dev.error(), right = dev.error()]) => [+left, +right])

export const part01 = (input: string): number => {
    const ranges = getRanges(input)
    const ids = getIds(input)

    return math.count(ids, (id) =>
        ranges.some(([left, right]) => math.isBetween(left, id, right)),
    )
}

export const part02 = (input: string): number => {
    const usefulRanges = list
        .unique(getRanges(input), (range) => range.join("-"))
        .filter(
            ([left, right], i, ranges) =>
                !ranges.some(
                    ([l, r], j) =>
                        i !== j &&
                        math.isBetween(l, left, r) &&
                        math.isBetween(l, right, r),
                ),
        )

    const adjustedRanges = list
        .sort(usefulRanges, ([left], [right]) => left - right)
        .map(
            ([left, right], i, sortedRanges) =>
                [
                    left,
                    Math.min(
                        right,
                        (sortedRanges.at(i + 1)?.[0] ?? right + 1) - 1,
                    ),
                ] as const,
        )

    return math.sum(adjustedRanges.map(([left, right]) => right - left + 1))
}
