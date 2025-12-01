import { list, math, text } from "@/utils"

const getClicks = (rotations: number[]): number[] =>
    rotations.reduce(
        (clicks, rotation) => [
            ...clicks,
            math.circle(list.at(clicks, -1) + rotation, [0, 99]),
        ],
        [50],
    )

const getRotations = (input: string): number[] =>
    text
        .lines(input)
        .map(([direction, ...distance]) =>
            direction === "L" ? -distance.join("") : +distance.join(""),
        )

export const part01 = (input: string): number => {
    const rotations = getRotations(input)
    const clicks = getClicks(rotations)

    return math.count(clicks, (click) => click === 0)
}

export const part02 = (input: string): number => {
    const rotations = getRotations(input)
    const clicks = getClicks(rotations)

    return math.sum(
        clicks.slice(0, -1).map((click, i) => {
            const rotation = list.at(rotations, i)

            return rotation < 0 ?
                    Math.floor((click + rotation) / -100) + +!!click
                :   Math.floor((click + rotation) / 100)
        }),
    )
}
