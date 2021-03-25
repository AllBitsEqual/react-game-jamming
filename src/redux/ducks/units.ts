/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit'

import { Sides, Unit, Units } from '../../data/units/types'
import { RootState } from '../index'

const initialState: Units = {}

export const addUnits = createAction('[UNITS] Add Index', (newUnits: Unit[]) => ({
    payload: {
        newUnits
    }
}))

export const getUnitsBySide = (units: Units, side: Sides): Unit[] => {
    return Object.values(units).filter(unit => unit.side === side)
}

export const selectUnits = (state: RootState): Units => state.units
export const selectEnemyUnits = (state: RootState): Unit[] => getUnitsBySide(state.units, 'enemy')
export const selectPlayerUnits = (state: RootState): Unit[] => getUnitsBySide(state.units, 'player')


const unitsReducer = createReducer(initialState, (builder) => {
    builder.addCase(addUnits, (state, action) => {
        const { newUnits } = action.payload
        const newStatePartial: Units[] = newUnits.map(newUnit => ({[newUnit.id]: newUnit}))

        return Object.assign({}, state, ...newStatePartial)
    })
})

export default unitsReducer
