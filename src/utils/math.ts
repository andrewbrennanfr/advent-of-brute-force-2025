export const count = <T>(
    array: T[],
    predicate: (value: T, i: number, array: T[]) => boolean,
): number => array.filter(predicate).length

export const sum = (numbers: number[]): number =>
    numbers.reduce((left, right) => left + right, 0)
