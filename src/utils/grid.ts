export const at = <T>(
    grid: T[][],
    { c, r }: Record<"c" | "r", number>,
): T | null => grid[r]?.[c] ?? null

export const siblings = ({
    c,
    r,
}: {
    c: number
    r: number
}): Record<
    "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw",
    Record<"c" | "r", number>
> => ({
    n: { r: r - 1, c },
    ne: { r: r - 1, c: c + 1 },
    e: { r, c: c + 1 },
    se: { r: r + 1, c: c + 1 },
    s: { r: r + 1, c },
    sw: { r: r + 1, c: c - 1 },
    w: { r, c: c - 1 },
    nw: { r: r - 1, c: c - 1 },
})
