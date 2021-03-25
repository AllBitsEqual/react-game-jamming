import { CreateUnitProps, Unit } from './types'
import { getRaceData } from '../races'

export const createUnit = ({ id, side, name, race, mods = {} }: CreateUnitProps): Unit => {
    const { hp, hpCurrent, mp, mpCurrent, interval, intervalCurrent } = {...getRaceData(race), ...mods}
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
        interval: {
            current: intervalCurrent || interval,
            base: interval,
        },
        targetAlly: null,
        targetEnemy: null,
    }
}
