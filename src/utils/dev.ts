export const error = <T>(payload?: T): never => {
    throw new Error(
        Bun.inspect(payload, { colors: true, depth: Infinity, sorted: true }),
    )
}

export const log = <T>(payload: T): T => {
    console.log(
        Bun.inspect(payload, { colors: true, depth: Infinity, sorted: true }),
    )

    return payload
}

export const measure = <T, U>(fn: () => T, payload?: Record<string, U>): T => {
    const start = Bun.nanoseconds()
    const result = fn()
    const end = Bun.nanoseconds()

    log({ ...payload, duration: `${(end - start) / 1_000_000}ms` })

    return result
}
