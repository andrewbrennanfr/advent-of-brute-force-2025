import { dev, graph, list, math, text } from "@/utils"

const getAllDistances = (() => {
    const cache = new Map<
        graph.Coordinate[],
        { distance: number; from: graph.Coordinate; to: graph.Coordinate }[]
    >()

    return (
        junctionBoxes: graph.Coordinate[],
    ): { distance: number; from: graph.Coordinate; to: graph.Coordinate }[] => {
        if (cache.has(junctionBoxes))
            return cache.get(junctionBoxes) ?? dev.error()

        const result = list.sort(
            junctionBoxes.slice(0, -1).flatMap((junctionBox, i) =>
                junctionBoxes.slice(i + 1).map((remainingJunctionBox) => ({
                    distance: graph.euclidean(
                        junctionBox,
                        remainingJunctionBox,
                    ),
                    from: junctionBox,
                    to: remainingJunctionBox,
                })),
            ),
            (left, right) => left.distance - right.distance,
        )

        cache.set(junctionBoxes, result)

        return result
    }
})()

const getJunctionBoxes = (input: string): graph.Coordinate[] =>
    text
        .lines(input)
        .map((line) => line.split(","))
        .map(([x = dev.error(), y = dev.error(), z = dev.error()]) => ({
            x: +x,
            y: +y,
            z: +z,
        }))

const getResult = (
    junctionBoxes: graph.Coordinate[],
    amount: number,
    steps: number = 0,
    circuits: Set<string>[] = junctionBoxes.map(
        (junctionBox) => new Set([JSON.stringify(junctionBox)]),
    ),
): number => {
    if (amount === steps)
        return math.prod(
            list
                .sort(circuits.map((circuit) => circuit.size))
                .toReversed()
                .slice(0, 3),
        )

    const shortestDistance = list.get(getAllDistances(junctionBoxes), steps)
    const shortestFromHash = JSON.stringify(shortestDistance.from)
    const shortestToHash = JSON.stringify(shortestDistance.to)

    const matches = circuits.filter(
        (circuitSet) =>
            circuitSet.has(shortestFromHash) || circuitSet.has(shortestToHash),
    )
    const matchingCircuit = new Set([
        shortestFromHash,
        shortestToHash,
        ...matches.flatMap((match) => [...match]),
    ])

    return matchingCircuit.size === junctionBoxes.length ?
            shortestDistance.from.x * shortestDistance.to.x // part 2
        :   getResult(junctionBoxes, amount, steps + 1, [
                ...circuits.filter(
                    (circuitSet) => !matches.includes(circuitSet),
                ),
                matchingCircuit,
            ])
}

export const part01 = (input: string, amount = 10): number =>
    getResult(getJunctionBoxes(input), amount)

export const part02 = (input: string): number =>
    getResult(getJunctionBoxes(input), Infinity)
