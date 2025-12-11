import { dev, math, text } from "@/utils"

const getMapping = (input: string): Record<string, string[]> =>
    Object.fromEntries(
        text
            .lines(input)
            .map((line) => line.split(" "))
            .map(([device = dev.error(), ...rest]) => [
                device.slice(0, -1),
                rest,
            ]),
    )

const getTotalPaths = (
    current: string,
    end: string,
    mapping: Record<string, string[]>,
): number =>
    current === end ? 1 : (
        math.sum(
            (mapping[current] ?? []).map((next) =>
                getTotalPaths(next, end, mapping),
            ),
        )
    )

const getTotalPaths2 = (
    current: string,
    end: string,
    mapping: Record<string, string[]>,
    fft: boolean = false,
    dac: boolean = false,
    memo: Record<string, number> = {},
): number => {
    if (current === end) return fft && dac ? 1 : 0

    const key = `${current}_${fft}_${dac}`

    if (!(key in memo))
        memo[key] = math.sum(
            (mapping[current] ?? []).map((next) =>
                getTotalPaths2(
                    next,
                    end,
                    mapping,
                    fft || next === "fft",
                    dac || next === "dac",
                    memo,
                ),
            ),
        )

    return memo[key] ?? dev.error()
}

export const part01 = (input: string): number =>
    getTotalPaths("you", "out", getMapping(input))

export const part02 = (input: string): number =>
    getTotalPaths2("svr", "out", getMapping(input))
