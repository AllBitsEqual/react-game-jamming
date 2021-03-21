/* eslint-disable no-param-reassign */
import { Middleware } from 'redux'
import { createAction } from '@reduxjs/toolkit'

import { requestData, createSelectData } from './api-store'
import { RootState } from '../index'
import { Maybe } from '../../util/types'

const USER_INFO_ENDPOINT = '/user-info'

export type UserInfo = {
    name: string
}


export const requestUserInfo = createAction('[USER] request user info')
export const selectUserInfo = createSelectData<UserInfo>(USER_INFO_ENDPOINT)
export const selectUserName = (state: RootState): Maybe<string> => selectUserInfo(state)?.name

export const userInfoMiddleware: Middleware = ({ dispatch }) => next => action => {
    next(action)

    if (requestUserInfo.match(action)) {
        dispatch(requestData(USER_INFO_ENDPOINT))
    }
}
