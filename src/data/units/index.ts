import { CreateUnitProps, Sides, Unit, Units } from './types'
import { getRaceData } from '../races'
import { Actor } from '../actorTimeFlow/types'

export const createUnit = ({ id, side, name, race, mods = {} }: CreateUnitProps): Unit => {
    const { hp, hpCurrent, mp, mpCurrent, attack, interval, intervalCurrent } = {...getRaceData(race), ...mods}
    return {
        side,
        name,
        race,
        id,
        hp: {
            current: (hpCurrent && hpCurrent <= hp) ? hpCurrent : hp,
            base: hp,
        },
        mp: mp ? {
            current: (mpCurrent && mpCurrent <= mp) ? mpCurrent : mp,
            base: mp,
        } : undefined,
        attack,
        interval: {
            current: intervalCurrent || interval,
            base: interval,
        },
        targetAlly: null,
        targetEnemy: null,
    }
}

export const getUnitsFromID = (ids: string[], units: Units): Unit[] => ids.map(id => units[id])

export const getUnitsFromSide = (units: Units, side: Sides): Unit[] => Object.values(units)
    .filter(unit => unit.side === side)

export const getUnitsFromEnemies = (units: Units, side: Sides): Unit[] => Object.values(units)
    .filter(unit => unit.side !== side)

export const getFirstEnemy = (actor: Actor, units: Units): string => {
    const enemies = getUnitsFromEnemies(units, actor.side)
    return enemies[0].id
}

