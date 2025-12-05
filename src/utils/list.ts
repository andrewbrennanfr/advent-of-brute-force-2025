import { dev } from "@/utils"

export const get = <T>(array: T[], i: number): NonNullable<T> =>
    array.at(i) ?? dev.error(`list.get(array, ${i})`)

export const sort = <T>(
    array: T[],
    compare: (left: T, right: T) => number = (left, right) =>
        left < right ? -1
        : left > right ? 1
        : 0,
): T[] => array.toSorted(compare)

export const unique = <T>(
    array: T[],
    hash: (value: T, i: number, array: T[]) => string,
): T[] => [
    ...new Map(
        array.map((value, ...args) => [hash(value, ...args), value]),
    ).values(),
]
