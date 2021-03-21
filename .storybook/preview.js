import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { default as styled, ThemeProvider } from 'styled-components'

import store from '../src/redux'
import { history } from '../src/redux/router'
import theme from '../src/util/selectedTheme'
import '../src/index.css'


export const decorators = [(Story) =>
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ThemeProvider theme={theme}>
                <BaseStyles>
                    <div style={{ margin: '3em' }}>
                        <Story/>
                    </div>
                </BaseStyles>
            </ThemeProvider>
        </ConnectedRouter>
    </Provider>
]

const BaseStyles = styled.div`
    ${props => props.theme.font.default};
    color: ${props => props.theme.palette.common.fontDefault};
`

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
