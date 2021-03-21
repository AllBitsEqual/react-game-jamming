/* eslint-disable no-param-reassign */
import { Middleware, Action } from 'redux'
import { createAction, createReducer } from '@reduxjs/toolkit'

const API_HOST = 'http://localhost:3031'

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type SuccessAction<T> = (data: T) => Action
export type ErrorAction = (message: string) => Action

export type ApiBaseRequest = {
    url: string
    headers?: Record<string, string>
}

export type ApiGetRequest = ApiBaseRequest & {
    method: 'GET'
}

export type ApiPostRequest = ApiBaseRequest & {
    method: 'POST'
    data: Record<string, unknown>
}

export type ApiPutRequest = ApiBaseRequest & {
    method: 'PUT'
    data: Record<string, unknown>
}

export type ApiDeleteRequest = ApiBaseRequest & {
    method: 'DELETE'
}

export type ApiRequest = ApiGetRequest | ApiPostRequest | ApiPutRequest | ApiDeleteRequest

export type ApiRequestPayload<T = never> = ApiRequest & {
    onSuccess: SuccessAction<T>
    onError?: ErrorAction
}

export type ApiSuccessPayload<T> = {
    onSuccess: SuccessAction<T>
    data: T
}

export type ApiErrorPayload = {
    onError: ErrorAction
    message: string
}


const API = '[API]'
export const API_REQUEST = `${API} request`
export const API_SUCCESS = `${API} success`
export const API_ERROR = `${API} error`

// It seems impossible to make the api request action creator generic.
// createActions cannot detect the generic payload,
// redux toolkit developers blame typescript limitations.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiRequest = createAction(API_REQUEST, (api: ApiRequestPayload<any>) => ({
    payload: { ...api },
}))

export const apiSuccess = createAction(API_SUCCESS,
    (key: string, onSuccess: SuccessAction<unknown>, data: unknown) => ({
        payload: { key, onSuccess, data },
    }))

export const apiError = createAction(API_ERROR,
    (key: string, onError: ErrorAction, message: string) => ({
        payload: { key, onError, message },
    }))

export const fetchingData = createAction(`${API} fetching`, (key: string) => ({
    payload: {
        key
    }
}))

export const receivedData = createAction(`${API} received data`, (key: string) => ({
    payload: {
        key
    }
}))

const apiCallKey = (request: ApiRequest): string => `${request.method}:${request.url}`
const isPending = (state: ApiState, key: string): boolean => {
    return (state.pendingRequests[key] && state.pendingRequests[key].status === 'pending') || false
}

export const apiMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
    next(action)

    if (apiRequest.match(action)) {
        const {
            url,
            method,
            headers,
            onSuccess,
            onError,
        }: ApiRequestPayload<any> = action.payload // eslint-disable-line @typescript-eslint/no-explicit-any


        const state = getState()
        const key = apiCallKey(action.payload)
        if(!isPending(state.api, key)) {
            fetch(`${API_HOST}${url}`, {
                method,
                headers
            })
                .then(response => response.json())
                .then(responseData => dispatch(apiSuccess(key, onSuccess, responseData)))
                .catch(error => {
                    if (onError) {
                        dispatch(apiError(key, onError, error.message))
                    } else {
                        console.log(key, error.message) // eslint-disable-line no-console
                    }
                })
            dispatch(fetchingData(key))
        }
    }

    if (apiSuccess.match(action)) {
        const { onSuccess, data, key } = action.payload
        dispatch(receivedData(key))
        dispatch(onSuccess(data))
    }

    if (apiError.match(action)) {
        const { onError, message, key } = action.payload
        dispatch(receivedData(key))
        if (onError) {
            dispatch(onError(message))
        }
    }
}

export type ApiState = {
    pendingRequests: {
        [key: string]: {
            status: 'pending' | 'ready'
        }
    }
}

const initialState: ApiState = {
    pendingRequests: {}
}

const apiReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchingData, (state, action) => {
            state.pendingRequests[action.payload.key] = {
                status: 'pending'
            }
        })
        .addCase(receivedData, (state, action) => {
            state.pendingRequests[action.payload.key] = {
                status: 'ready'
            }
        })
})

export default apiReducer
