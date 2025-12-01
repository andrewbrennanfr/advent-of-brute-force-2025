import { dev } from "@/utils"

export const at = <T>(array: T[], i: number): NonNullable<T> =>
    array.at(i) ?? dev.error(`list.at(array, ${i})`)
