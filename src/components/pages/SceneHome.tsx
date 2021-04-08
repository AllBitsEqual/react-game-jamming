import React from 'react'
import { DefaultPage } from '../UI/templates'
import { InternalNavLink } from '../links'

const SceneHome = (): React.ReactElement => (
    <DefaultPage>
        <h1>Idle RPG Demo</h1>
        <InternalNavLink to='/Camp'>Press To Play</InternalNavLink>
    </DefaultPage>
)

export default SceneHome
