import { apiMiddleware } from './ducks/api'
import { userInfoMiddleware } from './ducks/user-info'
import { apiStoreMiddleware } from './ducks/api-store'
import { routerMiddleware } from './router'

export default [
    routerMiddleware,
    apiMiddleware,
    userInfoMiddleware,
    apiStoreMiddleware,
]
