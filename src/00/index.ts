import { lines, log } from "@/utils"

const parse = (input: string): string[] => log(lines(input))

export const part01 = (input: string): number => {
    const data = parse(input)

    return data.length
}

export const part02 = (input: string): number => {
    const data = parse(input)

    return data.length
}
