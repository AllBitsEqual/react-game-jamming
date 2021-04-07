import { combineReducers } from '@reduxjs/toolkit'
import router from './router'
import unitsReducer from './ducks/units'
import atfReducer from './ducks/activeTimeFlow'
import battleLoopReducer from './ducks/battleLoop'
import battleLogReducer from './ducks/battleLog'
import animationReducer from './ducks/animation'

const rootReducer = combineReducers({
    router,
    units: unitsReducer,
    atf: atfReducer,
    battleLoop: battleLoopReducer,
    battleLog: battleLogReducer,
    animation: animationReducer,
})

export default rootReducer
