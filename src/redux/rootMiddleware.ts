import { routerMiddleware } from './router'
import { unitsMiddleware } from './ducks/units'
import { atfMiddleware } from './ducks/activeTimeFlow'
import { battleLoopMiddleware } from './ducks/battleLoop'

export default [
    routerMiddleware,
    unitsMiddleware,
    atfMiddleware,
    battleLoopMiddleware,
]
