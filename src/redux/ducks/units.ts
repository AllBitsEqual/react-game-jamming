/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit'
import { Middleware } from 'redux'

import { Sides, Unit, UnitChange, Units } from '../../data/units/types'
import { RootState } from '../index'

const initialState: Units = {}

export const addUnits = createAction(
    '[UNITS] Add Units',
    (newUnits: Unit[]) => ({
        payload: {
            newUnits
        }
    })
)

export const updateUnits = createAction(
    '[UNITS] Change Values',
    (changes: UnitChange[]) => ({
        payload: { changes }
    })
)

export const deleteUnits = createAction(
    '[UNITS] Delete Units',
    (unitsToRemove: string[]) => ({
        payload: {
            unitsToRemove
        }
    })
)

export const getUnitsBySide = (units: Units, side: Sides): Unit[] => {
    return Object.values(units).filter(unit => unit.side === side)
}

export const selectUnits = (state: RootState): Units => state.units
export const selectEnemyUnits = (state: RootState): Unit[] => getUnitsBySide(state.units, 'enemy')
export const selectPlayerUnits = (state: RootState): Unit[] => getUnitsBySide(state.units, 'player')

export const unitsMiddleware: Middleware = ({dispatch, getState}) => next => action => {
    next (action)

    if (updateUnits.match(action)) {
        const { units }: { units: Units} = getState()
        const deadUnits = Object.values(units)
            .filter(unit => (unit.hp.current<=0))
            .map(unit => unit.id)

        dispatch(deleteUnits(deadUnits))
    }
}

const unitsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addUnits, (state, action) => {
            const { newUnits } = action.payload
            const newStatePartial: Units[] = newUnits.map(newUnit => ({[newUnit.id]: newUnit}))

            return Object.assign({}, state, ...newStatePartial)
        })
        .addCase(updateUnits, (state, action) => {
            const { changes } = action.payload
            changes.forEach(({unitID, newValues}) => {
                state[unitID] = { ...state[unitID], ...newValues}
            })
        })
        .addCase(deleteUnits, (state, action) => {
            const { unitsToRemove } = action.payload
            const newStatePartial: Units[] = Object.values(state)
                .filter(unit => !unitsToRemove.includes(unit.id))
                .map(unit => ({[unit.id]: unit}))

                // newUnits.map(newUnit => ({[newUnit.id]: newUnit}))

            return Object.assign({}, ...newStatePartial)
        })
})

export default unitsReducer
