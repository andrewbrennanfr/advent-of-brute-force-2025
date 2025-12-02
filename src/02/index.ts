import { dev, math } from "@/utils"

const getIds = (input: string): [number, number][] =>
    input
        .trim()
        .split(",")
        .map((chunk) => chunk.split("-"))
        .map(([left = dev.error(), right = dev.error()]) => [+left, +right])

const getInvalids = (
    start: number,
    end: number,
    isInvalid: (string: string) => boolean,
    invalids: number[] = [],
): number[] =>
    start > end ? invalids : (
        getInvalids(
            start + 1,
            end,
            isInvalid,
            isInvalid(`${start}`) ? [...invalids, start] : invalids,
        )
    )

export const part01 = (input: string): number => {
    const ids = getIds(input)
    const invalids = ids.flatMap((id) =>
        getInvalids(
            ...id,
            (string) =>
                math.isDivisible(string.length, 2) &&
                /^(?<pattern>.+)\k<pattern>$/.test(string),
        ),
    )

    return math.sum(invalids)
}

export const part02 = (input: string): number => {
    const ids = getIds(input)
    const invalids = ids.flatMap((id) =>
        getInvalids(
            ...id,
            (string) =>
                string.length > 1 &&
                /^(?<pattern>.+)\k<pattern>+$/.test(string),
        ),
    )

    return math.sum(invalids)
}
