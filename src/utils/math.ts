export const circle = (
    number: number,
    [start, end]: [number, number],
): number => {
    const range = end - start + 1
    return ((((number - start) % range) + range) % range) + start
}

export const count = <T>(
    array: T[],
    predicate: (value: T, i: number, array: T[]) => boolean,
): number => array.filter(predicate).length

export const isDivisible = (left: number, right: number): boolean =>
    !(left % right)

export const sum = (numbers: number[]): number =>
    numbers.reduce((left, right) => left + right, 0)
