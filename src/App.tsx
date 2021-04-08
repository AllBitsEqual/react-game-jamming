import React from 'react'
import { Provider } from 'react-redux'
import { default as styled, ThemeProvider } from 'styled-components'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './redux'
import { history } from './redux/router'
import Routes from './routes'
import theme from './util/selectedTheme'

function App(): React.ReactElement {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <ThemeProvider theme={theme}>
                        <BaseStyles>
                            <Routes />
                        </BaseStyles>
                    </ThemeProvider>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    )
}

const BaseStyles = styled.div`
    ${props => props.theme.font.default};
    color: ${props => props.theme.palette.common.fontDefault};
`

export default App
