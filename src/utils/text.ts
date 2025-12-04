export const characters = (string: string): string[] => string.trim().split("")

export const grid = (string: string): string[][] =>
    lines(string).map(characters)

export const lines = (string: string): string[] => string.trim().split("\n")
