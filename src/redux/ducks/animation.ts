import { createAction, createReducer } from '@reduxjs/toolkit'
import { RootState } from '../index'

type Action = {
    label: string
    action: string
    targets: string[]

}

type AnimationState = {
    activeUnit: string | null
    targets: string[]
    actions: Action[]
}
const initialState: AnimationState = {
    activeUnit: null,
    targets: [],
    actions: [],
}

export const setActiveUnit = createAction(
    '[ANIMATION] Set Active Unit',
    (unitID: string | null) => ({
        payload: { unitID }
    })
)

export const selectActiveUnit = (state: RootState): string | null =>  state.animation.activeUnit || null

const animationReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setActiveUnit, (state, action) => {
            const { unitID } = action.payload
            return {...state, activeUnit: unitID}
        })
})

export default animationReducer
