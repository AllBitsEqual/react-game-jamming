import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware as routerMiddlewareFactor } from 'connected-react-router'

export const history = createBrowserHistory()
export const routerMiddleware = routerMiddlewareFactor(history)

export default connectRouter(history)
