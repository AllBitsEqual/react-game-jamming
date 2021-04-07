/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit'

type LogType =
    | 'action'
    | 'damage'
    | 'status'
    | 'death'
    | 'info'
    | 'other'

type Placeholder = {
    id: string
    label: string
    type: 'unit' | 'spell' | 'ability' | 'item'
}

type LogEntry = {
    timestamp: number
    type: LogType
    text: string
    placeholders?: Placeholder[]
}

const initialState: LogEntry[] = []

export const addToBattleLog = createAction(
    '[LOG BATTLE] Add action to battle log',
    (actor: string, action: string) => ({
        payload: {
            actor,
            action,
        }
    })
)

const battleLogReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addToBattleLog, (state, action) => {
            const {actor, action: actorAction} = action.payload
            state.push({
                timestamp: Date.now(),
                type: 'other',
                text: `${actor} did ${actorAction}`,
            })
            return state
        })
})

export default battleLogReducer
