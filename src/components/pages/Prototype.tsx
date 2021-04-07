import React, { useState } from 'react'
import styled from 'styled-components'
import { DefaultPage } from '../UI/templates'
import Arena from '../stuff/Arena'
import ATFBar from '../stuff/ATFBar'

const Prototype = (): React.ReactElement => {
    const [selectedUnit, setSelectedUnit] = useState<string | null>(null)

    const clickUnitHandler = (id: string) => setSelectedUnit(id !== selectedUnit ? id : null)

    return (
        <DefaultPage>
            <h1>Idle RPG Demo</h1>
            <StyledBattleView>
                <ATFBar selectedUnit={selectedUnit} />
                <Arena selectedUnit={selectedUnit} clickHandler={clickUnitHandler} />
            </StyledBattleView>
        </DefaultPage>
    )
}

const StyledBattleView = styled.div`
    border: 1px solid black;
    padding: 5px;
    margin: 20px 0;
    display: flex;
    flex-direction: row;
`

export default Prototype
