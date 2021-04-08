import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import {
    persistStore,
    persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'
import middleware from './rootMiddleware'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: [],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
