import { math, text } from "@/utils"

const getBanks = (input: string): number[][] =>
    text.lines(input).map((line) => text.characters(line).map(Number))

const getJoltage = (bank: number[], size = 2): string => {
    if (size === 0) return ""

    if (bank.length === size) return bank.join("")

    const possibleMaxes = bank.slice(0, -1 * (size - 1) || bank.length)
    const max = Math.max(...possibleMaxes)
    const withoutMax = bank.slice(bank.indexOf(max) + 1)

    return `${max}${getJoltage(withoutMax, size - 1)}`
}

export const part01 = (input: string): number =>
    math.sum(getBanks(input).map((bank) => +getJoltage(bank)))

export const part02 = (input: string): number =>
    math.sum(getBanks(input).map((bank) => +getJoltage(bank, 12)))
