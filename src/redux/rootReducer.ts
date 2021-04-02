import { combineReducers } from '@reduxjs/toolkit'
import router from './router'
import unitsReducer from './ducks/units'

const rootReducer = combineReducers({
    router,
    units: unitsReducer,
})

export default rootReducer
