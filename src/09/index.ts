import { dev, grid, math, list, text } from "@/utils"

const getAreas = (
    pairs: Record<"from" | "to", grid.Position>[],
): (Record<"from" | "to", grid.Position> & Record<"area", number>)[] =>
    list.sort(
        pairs.map(({ from, to }) => ({ area: grid.area(from, to), from, to })),
        (left, right) => right.area - left.area,
    )

const getLines = (
    tiles: grid.Position[],
): Record<"from" | "to", grid.Position>[] =>
    tiles.map((from, i) => ({
        from,
        to: tiles.at(i + 1) ?? tiles.at(0) ?? dev.error(),
    }))

const getPairs = (
    tiles: grid.Position[],
): Record<"from" | "to", grid.Position>[] =>
    tiles.flatMap((from, i) => tiles.slice(i + 1).map((to) => ({ from, to })))

const getSquare = ({ from, to }: Record<"from" | "to", grid.Position>) => [
    from,
    { c: from.c, r: to.r },
    to,
    { c: to.c, r: from.r },
]

const getTiles = (input: string): grid.Position[] =>
    text
        .lines(input)
        .map((line) => line.split(","))
        .map(([c = dev.error(), r = dev.error()]) => ({ c: +c, r: +r }))

const isOnTiles = (
    tileLines: Record<"from" | "to", grid.Position>[],
    corner: grid.Position,
): boolean =>
    tileLines.some((tileLine) => {
        if (tileLine.from.c === corner.c && tileLine.to.c === corner.c)
            return math.isBetween(tileLine.from.r, corner.r, tileLine.to.r)

        if (tileLine.from.r === corner.r && tileLine.to.r === corner.r)
            return math.isBetween(tileLine.from.c, corner.c, tileLine.to.c)

        return false
    })

const isIntersectingWithEnds = (
    left: Record<"from" | "to", grid.Position>,
    right: Record<"from" | "to", grid.Position>,
): boolean => {
    const isLeftHorz = isHorizontal(left)
    const isRightHorz = isHorizontal(right)
    const isLeftVert = isVertical(left)
    const isRightVert = isVertical(right)

    if (isLeftHorz && isRightVert)
        return (
            math.isBetween(right.from.r, left.from.r, right.to.r) &&
            math.isBetween(left.from.c, right.from.c, left.to.c)
        )

    if (isLeftVert && isRightHorz)
        return (
            math.isBetween(left.from.r, right.from.r, left.to.r) &&
            math.isBetween(right.from.c, left.from.c, right.to.c)
        )

    if (isLeftVert && isRightVert)
        return (
            left.from.c === right.from.c &&
            (math.isBetween(left.from.r, right.from.r, left.to.r) ||
                math.isBetween(right.from.r, left.from.r, right.to.r))
        )

    if (isLeftHorz && isRightHorz)
        return (
            left.from.r === right.from.r &&
            (math.isBetween(left.from.c, right.from.c, left.to.c) ||
                math.isBetween(right.from.c, left.from.c, right.to.c))
        )

    return false
}

const isIntersectingWithoutEnds = (
    left: Record<"from" | "to", grid.Position>,
    right: Record<"from" | "to", grid.Position>,
): boolean => {
    const isLeftHorz = isHorizontal(left)
    const isRightHorz = isHorizontal(right)
    const isLeftVert = isVertical(left)
    const isRightVert = isVertical(right)

    if (isLeftHorz && isRightVert)
        return (
            math.isInside(right.from.r, left.from.r, right.to.r) &&
            math.isInside(left.from.c, right.from.c, left.to.c)
        )

    if (isLeftVert && isRightHorz)
        return (
            math.isInside(left.from.r, right.from.r, left.to.r) &&
            math.isInside(right.from.c, left.from.c, right.to.c)
        )

    return false
}

const isHorizontal = (line: Record<"from" | "to", grid.Position>): boolean =>
    line.from.r === line.to.r

const isVertical = (line: Record<"from" | "to", grid.Position>): boolean =>
    line.from.c === line.to.c

const isInside = (
    tiles: grid.Position[],
    tileLines: Record<"from" | "to", grid.Position>[],
    position: grid.Position,
): boolean => {
    const maxRow = Math.max(...tiles.map(({ r }) => r)) + 1
    const maxCol = Math.max(...tiles.map(({ c }) => c)) + 1
    const minRow = Math.min(...tiles.map(({ r }) => r)) - 1
    const minCol = Math.min(...tiles.map(({ c }) => c)) - 1

    if (isOnTiles(tileLines, position)) return true

    const northLine = { from: { ...position, r: minRow }, to: position }
    const northPasses = tileLines.filter((tileLine) =>
        isIntersectingWithoutEnds(tileLine, northLine),
    ).length
    const northIntersections = tileLines.filter((tileLine) =>
        isIntersectingWithEnds(tileLine, northLine),
    ).length

    if (northPasses === northIntersections)
        return !math.isDivisible(northPasses, 2)

    const westLine = { from: { ...position, c: minCol }, to: position }
    const westPasses = tileLines.filter((tileLine) =>
        isIntersectingWithoutEnds(tileLine, westLine),
    ).length
    const westIntersections = tileLines.filter((tileLine) =>
        isIntersectingWithEnds(tileLine, westLine),
    ).length

    if (westPasses === westIntersections)
        return !math.isDivisible(westPasses, 2)

    const eastLine = { from: position, to: { ...position, c: maxCol } }
    const eastPasses = tileLines.filter((tileLine) =>
        isIntersectingWithoutEnds(tileLine, eastLine),
    ).length
    const eastIntersections = tileLines.filter((tileLine) =>
        isIntersectingWithEnds(tileLine, eastLine),
    ).length

    if (eastPasses === eastIntersections)
        return !math.isDivisible(eastPasses, 2)

    const southLine = { from: position, to: { ...position, r: maxRow } }
    const southPasses = tileLines.filter((tileLine) =>
        isIntersectingWithoutEnds(tileLine, southLine),
    ).length
    const southIntersections = tileLines.filter((tileLine) =>
        isIntersectingWithEnds(tileLine, southLine),
    ).length

    if (southPasses === southIntersections)
        return !math.isDivisible(eastPasses, 2)

    dev.log(
        "This is a particulary cruel input that reaches here - let's assume it's not what we are looking for!",
    )
    return false
}

const isConstrained = (
    tiles: grid.Position[],
    tileLines: Record<"from" | "to", grid.Position>[],
    square: {
        area: number
        corners: grid.Position[]
        from: grid.Position
        lines: Record<"from" | "to", grid.Position>[]
        to: grid.Position
    },
): boolean =>
    square.corners.every((corner) => isInside(tiles, tileLines, corner)) &&
    !square.lines.some((squareLine) =>
        tileLines.some((tileLine) =>
            isIntersectingWithoutEnds(squareLine, tileLine),
        ),
    )

export const part01 = (input: string): number =>
    Math.max(...getAreas(getPairs(getTiles(input))).map(({ area }) => area))

export const part02 = (input: string): number => {
    const tiles = getTiles(input)
    const pairs = getPairs(tiles)
    const areas = getAreas(pairs).map(({ area, from, to }) => ({
        area,
        corners: getSquare({ from, to }),
        from,
        lines: getLines(getSquare({ from, to })),
        to,
    }))

    return (
        areas.find(isConstrained.bind(null, tiles, getLines(tiles))) ??
        dev.error()
    ).area
}
