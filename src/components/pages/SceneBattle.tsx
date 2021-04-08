import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DefaultPage } from '../UI/templates'
import Arena from '../stuff/Arena'
import ATFBar from '../stuff/ATFBar'
import { initialiseBattle, selectBattleState } from '../../redux/ducks/battleLoop'
import { useReduxDispatch, useReduxSelector } from '../../redux'
import { useCombatUnits, useEnemyUnits, usePlayerUnits } from '../../data/units/hooks'
import { createInitialUnits } from '../../data/testData'

const SceneBattle = (): React.ReactElement => {
    const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
    const units = useCombatUnits(createInitialUnits())
    const playerUnits = usePlayerUnits()
    const enemyUnits = useEnemyUnits()
    const dispatch = useReduxDispatch()

    const { phase } = useReduxSelector(selectBattleState)

    const clickUnitHandler = (id: string) => setSelectedUnit(id !== selectedUnit ? id : null)

    useEffect(() => {
        console.log("Scene Battle mounted")

        return () => {
            console.log("Scene Battle unmounted")
        }
    })

    useEffect(() => {
        if (phase === 'inactive') {
            dispatch(initialiseBattle())
        }
    }, [dispatch, units, phase])

    return (
        <DefaultPage backLink='/Camp'>
            <h1>Idle RPG Demo</h1>
            <StyledBattleView>
                <ATFBar selectedUnit={selectedUnit} />
                <Arena
                    playerUnits={playerUnits}
                    enemyUnits={enemyUnits}
                    selectedUnit={selectedUnit}
                    clickHandler={clickUnitHandler}
                />

            </StyledBattleView>
            { selectedUnit && units[selectedUnit] && (<p>Selected Unit: {units[selectedUnit].name}</p>) }
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

export default SceneBattle
