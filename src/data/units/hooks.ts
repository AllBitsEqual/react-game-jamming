import { useEffect } from 'react'
import { useReduxDispatch, useReduxSelector } from '../../redux'
import { addUnits, selectEnemyUnits, selectPlayerUnits, selectUnits } from '../../redux/ducks/units'
import { Unit, Units } from './types'

export const useCombatUnits = (initialUnits: Unit[]): Units => {
    const data = useReduxSelector(selectUnits)
    const dispatch = useReduxDispatch()

    useEffect(() => {
        if (!Object.keys(data).length) {
            dispatch(addUnits(initialUnits))
        }
    }, [dispatch, data, initialUnits])

    return data
}

export const usePlayerUnits = (): Unit[] => useReduxSelector(selectPlayerUnits)
export const useEnemyUnits = (): Unit[] => useReduxSelector(selectEnemyUnits)
