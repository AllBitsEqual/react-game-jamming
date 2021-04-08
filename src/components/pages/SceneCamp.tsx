import React from 'react'
import { DefaultPage } from '../UI/templates'
import { InternalNavLink } from '../links'

const SceneCamp = (): React.ReactElement => (
    <DefaultPage backLink='/'>
        <h1>Camp</h1>
        <InternalNavLink to='/Battle'>Explore Area</InternalNavLink>
    </DefaultPage>
)

export default SceneCamp
