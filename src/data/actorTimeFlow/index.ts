import { Units } from '../units/types'
import { Actor } from './types'

export const sortByNextInterval = (a: Actor, b: Actor): number => a.nextInterval - b.nextInterval

export const getActionList = (units: Units): Actor[] => {
    if (!Object.values(units).length) return []
    const actorList: Actor[] = Object.values(units).map(unit => {
        const {id, name, side, interval: {base: intBase, current: intCurrent}} = unit
        return ({
            id,
            name,
            side,
            interval: intBase,
            nextInterval: intCurrent,
        })
    }).sort(sortByNextInterval)

    const actionList: Actor[] = []

    for (let i = 0; i < 12; i++) {
        actionList.push({...actorList[0]})
        actorList[0].nextInterval += actorList[0].interval
        actorList.sort(sortByNextInterval)
    }

    return actionList
}
