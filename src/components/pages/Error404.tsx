import React from 'react'
import { DefaultPage } from '../UI/templates'

const Error404 = (): React.ReactElement => (
    <DefaultPage>
        <h1>404 Not Found</h1>
        <p>The requested page could not be found</p>
    </DefaultPage>
)

export default Error404
