import { Sides } from '../units/types'

export type Actor = {
    id: string
    name: string
    interval: number
    nextInterval: number
    side: Sides
}
