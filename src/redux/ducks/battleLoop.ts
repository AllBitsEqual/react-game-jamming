/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import { addToBattleLog } from './battleLog'
import { RootState } from '../index'
import { calculateActiveTimeFlow } from './activeTimeFlow'
import { updateUnits } from './units'
import { Actor } from '../../data/actorTimeFlow/types'
import { setActiveUnit } from './animation'
import { getResultsFromAction } from '../../data/temp'
import { getUnitsFromSide } from '../../data/units'

const slowDown = 1000

export type BattleState =
    | 'inactive'
    | 'loading'
    | 'checking'
    | 'idle'
    | 'calculating'
    | 'animating'

type BattleLoop = {
    phase: BattleState
    isPaused: boolean
    counter: number
}

const initialState: BattleLoop = {
    phase: 'inactive',
    isPaused: false,
    counter: 0,
}

export const initialiseBattle = createAction(
    '[BATTLE] initialise new battle'
)
const checkWinLoseState = createAction(
    '[BATTLE] check win/lose state'
)
const calculateNextAction = createAction(
    '[BATTLE] calculate next action'
)
const performAction = createAction(
    '[BATTLE] perform action',
    (actor: Actor, performedAction: string) => ({
        payload: {
            actor,
            performedAction,
        }
    })
)
const increaseBattleCounter = createAction(
    '[BATTLE] increase battle counter',
    (time: number) => ({
        payload: time
    })
)

export const resetBattle = createAction(
    '[BATTLE] reset existing battle'
)

export const selectBattleState = (state: RootState): BattleLoop => state.battleLoop

export const battleLoopMiddleware: Middleware = ({dispatch, getState}) => next => action => {
    next(action)

    if (initialiseBattle.match(action)) {
        // add units
        setTimeout(() => {
            dispatch(calculateActiveTimeFlow())
            dispatch(checkWinLoseState())
        }, 100 + slowDown)
    }

    if (checkWinLoseState.match(action)) {
        const { units } = getState()
        const enemies = getUnitsFromSide(units, 'enemy')
        const allies = getUnitsFromSide(units, 'player')
        const battleOver = enemies.length === 0 || allies.length === 0
        setTimeout(() => {
            if (!battleOver) {
                dispatch(calculateNextAction())
            }
        }, 300 + slowDown)
    }

    if (calculateNextAction.match(action)) {
        // get next unit in queue
        const { atf, battleLoop } = getState()
        const nextUnit = atf[0]
        // get unit's action
        const nextAction = 'basic' // getNextAction(nextUnit)
        setTimeout(() => {
            if (nextUnit.nextInterval > battleLoop.counter) {
                dispatch(increaseBattleCounter(nextUnit.nextInterval))
            }
            dispatch(setActiveUnit(nextUnit.id))

            dispatch(performAction(nextUnit, nextAction))
            dispatch(addToBattleLog(nextUnit.id, nextAction))
        }, 100 + slowDown)
    }

    if (performAction.match(action)) {
        // animate action
        // update targets
        // update unit/actor with new position in cue after action
        const { actor, performedAction } = action.payload
        const { units } = getState()

        // fake action logic, random enemy basic attack
        const results = getResultsFromAction(actor, performedAction, units)


        dispatch(updateUnits(results))

        setTimeout(() => {
            dispatch(updateUnits([
                {
                    unitID: actor.id,
                    newValues: {
                        interval: {
                            base: actor.interval,
                            current: actor.nextInterval + actor.interval,
                        }
                    }
        }
            ]))
            dispatch(setActiveUnit(null))
            dispatch(calculateActiveTimeFlow())
            dispatch(checkWinLoseState())
        }, 100 + slowDown)
    }
}


const battleLoopReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(initialiseBattle, (state) => {
            return {...state, phase: 'loading'}
        })
        .addCase(checkWinLoseState, (state) => {
            return {...state, phase: 'idle'}
        })
        .addCase(calculateNextAction, (state) => {
            return {...state, phase: 'calculating'}
        })
        .addCase(performAction, (state) => {
            return {...state, phase: 'animating'}
        })
        .addCase(increaseBattleCounter, (state, action) => {
            return {...state, counter: action.payload}
        })
})

export default battleLoopReducer
