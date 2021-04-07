import { createAction, createReducer } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import { Actor } from '../../data/actorTimeFlow/types'
import { RootState } from '../index'
import { getActionList } from '../../data/actorTimeFlow'

const initialState: Actor[] = []

export const calculateActiveTimeFlow = createAction(
    '[ATF] Calculate ActiveTimeFlow',
)
const updateActiveTimeFlow = createAction(
    '[ATF] Update ActiveTimeFlow',
    (actors: Actor[]) => ({
        payload: {
            actors
        }
    })
)

export const selectActiveFlowMap = (state: RootState): Actor[] => state.atf

export const atfMiddleware: Middleware = ({dispatch, getState})=> next => action => {
    next(action)

    if (calculateActiveTimeFlow.match(action)) {
        const { units } = getState()
        if (units) {
            const actors = getActionList(units)
            dispatch(updateActiveTimeFlow(actors))
        }
    }
}

const atfReducer = createReducer(initialState, (builder => {
    builder.addCase(updateActiveTimeFlow, (state, action) => {
        const { actors } = action.payload
        return actors
    })
}))

export default atfReducer
