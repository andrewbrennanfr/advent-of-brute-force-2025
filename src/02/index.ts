import { dev, math } from "@/utils"

const getIds = (input: string): [number, number][] =>
    input
        .trim()
        .split(",")
        .map((chunk) => chunk.split("-"))
        .map(([left = dev.error(), right = dev.error()]) => [+left, +right])

const getInvalids = (
    [start, end]: [number, number],
    isInvalid: (string: string) => boolean,
    invalids: number[] = [],
): number[] =>
    start > end ? invalids : (
        getInvalids(
            [start + 1, end],
            isInvalid,
            isInvalid(`${start}`) ? [...invalids, start] : invalids,
        )
    )

export const part01 = (input: string): number =>
    math.sum(
        getIds(input).flatMap((id) =>
            getInvalids(
                id,
                (string) =>
                    math.isDivisible(string.length, 2) &&
                    /^(?<repeat>.+)\k<repeat>$/.test(string),
            ),
        ),
    )

export const part02 = (input: string): number =>
    math.sum(
        getIds(input).flatMap((id) =>
            getInvalids(id, (string) =>
                /^(?<repeat>.+)\k<repeat>+$/.test(string),
            ),
        ),
    )
