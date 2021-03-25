export const elements = [
    "air",
    "fire",
    "earth",
    "water",
    "void",
    "aether",
] as const

export type Element = typeof elements[number]

export type Resistance = {
    [key in Element]?: number
}
