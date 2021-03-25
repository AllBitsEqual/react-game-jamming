import { RaceName } from '../races'

export type Attribute =
    | 'hp'
    | 'mp'

export type AttributeValues = {
    current: number
    base: number
}

export type UnitData = {
    name: string
    id: string
    race: RaceName
    hp: AttributeValues
    mp?: AttributeValues
    interval: AttributeValues
}

export type Sides = 'player' | 'enemy'

export type Unit = UnitData & {
    side: Sides
    targetAlly: string | null
    targetEnemy: string | null
}

export type Units = {
    [key: string] : Unit
}

export type UnitMods = {
    hpCurrent?: number
    hp?: number
    mpCurrent?: number
    mp?: number
    intervalCurrent?: number
    interval?: number
}

export type CreateUnitProps = {
    id: string
    side: Sides
    name: string
    race: RaceName
    mods?: UnitMods
}