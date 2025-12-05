import { grid as grid_ } from "@/utils"

export const characters = (string: string): string[] => string.trim().split("")

export const grid = (string: string): grid_.Grid<string> =>
    lines(string).map(characters)

export const lines = (string: string): string[] => string.trim().split("\n")

export const replace = (
    string: string,
    ...replacements: [string, string][]
): string =>
    replacements.reduce(
        (string, [before, after]) => string.replaceAll(before, after),
        string,
    )
