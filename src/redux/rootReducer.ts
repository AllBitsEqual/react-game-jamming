import { combineReducers } from '@reduxjs/toolkit'
import apiReducer from './ducks/api'
import apiStoreReducer from './ducks/api-store'
import router from './router'
import unitsReducer from './ducks/units'

const rootReducer = combineReducers({
    router,
    api: apiReducer,
    apiStore: apiStoreReducer,
    units: unitsReducer,
})

export default rootReducer
