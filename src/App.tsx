import React from 'react'
import { Provider } from 'react-redux'
import { default as styled, ThemeProvider } from 'styled-components'
import { ConnectedRouter } from 'connected-react-router'
import store from './redux'
import { history } from './redux/router'
import Routes from './routes'
import theme from './util/selectedTheme'

function App(): React.ReactElement {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={theme}>
                    <BaseStyles>
                        <Routes />
                    </BaseStyles>
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    )
}

const BaseStyles = styled.div`
    ${props => props.theme.font.default};
    color: ${props => props.theme.palette.common.fontDefault};
`

export default App
