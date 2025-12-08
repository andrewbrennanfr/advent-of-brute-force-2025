export type Coordinate = Record<"x" | "y" | "z", number>

export const euclidean = (left: Coordinate, right: Coordinate): number =>
    Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z)
