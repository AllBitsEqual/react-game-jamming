import { Actor } from './actorTimeFlow/types'
import { UnitChange, Units } from './units/types'
import { getFirstEnemy, getUnitsFromID } from './units'

const getDefaultAction = (
    actor: Actor,
    units: Units,
): UnitChange[] => {
    const actorUnit = units[actor.id]
    const targetID = getFirstEnemy(actor, units)
    const target = getUnitsFromID([targetID], units)[0]

    return [
        {
            unitID: targetID,
            newValues: {
                hp: {
                    base: target.hp.base,
                    current: Math.max(
                        0,
                        target.hp.current - actorUnit.attack
                    )
                }
            }
        }
    ]
}

export const getResultsFromAction = (
    actor: Actor,
    performedAction: string,
    units: Units,
): UnitChange[] => {
    const results: UnitChange[] = []

    switch (performedAction) {
        case ('basic'):
        default: {
            return getDefaultAction(actor, units)
        }
    }

    return results
}
