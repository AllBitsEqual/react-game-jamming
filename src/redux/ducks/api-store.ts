/* eslint-disable no-param-reassign */
import { Middleware } from 'redux'
import { createAction, createReducer, Action } from '@reduxjs/toolkit'
import { apiRequest } from './api'
import { RootState } from '../index'
import { Maybe } from '../../util/types'


export type DataAction<T> = (data: T) => Action

type InitialState = {
    [key: string]: {
        data: unknown
    }
}


const initialState: InitialState = {}

export const requestData = createAction('[STORE] request data',
    (endpoint: string, onData: DataAction<unknown> | null = null) => ({
        payload: {
            endpoint,
            onData
        }
    }))
export const storeData = createAction('[STORE] store data',
    (endpoint: string, data: unknown, onData: DataAction<unknown> | null = null) => ({
        payload: {
            endpoint,
            data,
            onData
        }
    }))

export const apiStoreMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
    next(action)

    if (requestData.match(action)) {
        const { endpoint, onData } = action.payload
        const state = getState()
        if (state[endpoint]) {
            if (onData) {
                dispatch(onData(state[endpoint]))
            }
        } else {
            dispatch(apiRequest({
                url: endpoint,
                method: 'GET',
                onSuccess: data => storeData(endpoint, data, onData)
            }))
        }
    }

    if (storeData.match(action)) {
        const { data, onData } = action.payload
        if (onData) {
            dispatch(onData(data))
        }
    }
}


type ValueOrFunction<T> = ((state: RootState) => T) | T
const evaluate = <T>(state: RootState, something: ValueOrFunction<T>): T => {
    if (typeof something === 'function') {
        // I don't know why, but typescript does not think I can call this function...
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return something(state)
    }

    return something
}

export const createSelectData = <T>(endpoint: ValueOrFunction<Maybe<string>>) => (state: RootState): Maybe<T> => {
    const url = evaluate(state, endpoint)
    return url
        ? state.apiStore[url]?.data as Maybe<T>
        : null
}


const ApiStoreReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(storeData, (state, action) => {
            const { endpoint, data } = action.payload
            state[endpoint] = { data }
        })
})

export default ApiStoreReducer
