import { list, math, text } from "@/utils"

const getFewestLights = ({
    buttons,
    lightsCurrent,
    lightsEnd,
}: {
    buttons: number[][]
    lightsCurrent: boolean[]
    lightsEnd: boolean[]
}): number => {
    let currents = [lightsCurrent]
    let presses = 0

    while (true) {
        const match = currents.find(
            (current) => JSON.stringify(current) === JSON.stringify(lightsEnd),
        )

        if (match) return presses

        currents = currents.flatMap((current) =>
            buttons.map((button) =>
                current.map((light, i) =>
                    button.includes(i) ? !light : light,
                ),
            ),
        )

        currents = list.unique(currents, (item) => JSON.stringify(item))

        presses++
    }
}

const getFewestJoltages = ({
    buttons,
    joltagesCurrent,
    joltagesEnd,
}: {
    buttons: number[][]
    joltagesCurrent: number[]
    joltagesEnd: number[]
}): number => {
    let currents = [joltagesCurrent]
    let presses = 0

    while (true) {
        const match = currents.find(
            (current) =>
                JSON.stringify(current) === JSON.stringify(joltagesEnd),
        )

        if (match) return presses

        currents = currents.flatMap((current) =>
            buttons.map((button) =>
                current.map((joltage, i) =>
                    button.includes(i) ? joltage + 1 : joltage,
                ),
            ),
        )

        currents = list.unique(currents, (item) => JSON.stringify(item))

        presses++
    }
}

const getMachines = (
    input: string,
): {
    buttons: number[][]
    joltagesCurrent: number[]
    joltagesEnd: number[]
    lightsCurrent: boolean[]
    lightsEnd: boolean[]
}[] =>
    text.lines(input).map((line) => {
        const lights = [...list.get(line.slice(1).split("]"), 0)]
        const lightsCurrent = lights.map(() => false)
        const lightsEnd = lights.map((light) => light === "#")

        const buttons = line
            .split(" ")
            .filter((chunk) => chunk.startsWith("("))
            .map((chunk) =>
                chunk
                    .slice(1, -1)
                    .split(",")
                    .map((digit) => +digit),
            )

        const joltagesEnd = list
            .get(line.split(" "), -1)
            .slice(1, -1)
            .split(",")
            .map((digit) => +digit)
        const joltagesCurrent = joltagesEnd.map(() => 0)

        return {
            buttons,
            joltagesCurrent,
            joltagesEnd,
            lightsCurrent,
            lightsEnd,
        }
    })

export const part01 = (input: string): number => {
    const machines = getMachines(input)
    const fewestLights = machines.map(getFewestLights)

    return math.sum(fewestLights)
}

export const part02 = (input: string): number => {
    const machines = getMachines(input)
    const fewestJoltages = machines.map(getFewestJoltages)

    return math.sum(fewestJoltages)
}
