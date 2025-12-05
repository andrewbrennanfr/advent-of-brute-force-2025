import { dev } from "@/utils"

export const at = <T>(array: T[], i: number): NonNullable<T> =>
    array.at(i) ?? dev.error(`list.at(array, ${i})`)

export const sort = <T>(array: T[], fn?: (left: T, right: T) => number): T[] =>
    array.toSorted(
        fn ??
            ((left, right) =>
                left < right ? -1
                : left > right ? 1
                : 0),
    )

export const unique = <T>(
    array: T[],
    hash: (value: T, i: number, array: T[]) => string,
): T[] => [
    ...new Map(
        array.map((value, ...args) => [hash(value, ...args), value]),
    ).values(),
]
