import { combineReducers } from '@reduxjs/toolkit'
import apiReducer from './ducks/api'
import apiStoreReducer from './ducks/api-store'
import router from './router'

const rootReducer = combineReducers({
    router,
    api: apiReducer,
    apiStore: apiStoreReducer,
})

export default rootReducer
