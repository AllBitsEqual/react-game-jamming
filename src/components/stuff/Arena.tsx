import React, { useEffect } from 'react'
import styled from 'styled-components'
import { UnitData } from '../../data/units/types'
import Unit from './Unit'
import { useCombatUnits, useEnemyUnits, usePlayerUnits } from '../../data/units/hooks'
import { createInitialUnits } from '../../data/testData'
import { useReduxDispatch, useReduxSelector } from '../../redux'
import { initialiseBattle, selectBattleState } from '../../redux/ducks/battleLoop'
import { selectActiveUnit } from '../../redux/ducks/animation'

type ArenaProps = {
    selectedUnit: string | null;
    clickHandler: (id: string) => void;
};

const renderUnit = (
    unit: UnitData,
    isChecked: boolean,
    isActive: boolean,
    clickHandler: (id: string) => void
) => (
    <StyledButton
        isChecked={isChecked}
        isActive={isActive}
        type='button'
        key={unit.id}
        onClick={() => clickHandler(unit.id)}
    >
        <input type='radio' name='unitRadio' readOnly checked={isChecked} value={unit.id} id={unit.id} />
        <Unit data={unit} />
    </StyledButton>
)

const Arena = ({ selectedUnit, clickHandler }: ArenaProps): React.ReactElement => {
    const units = useCombatUnits(createInitialUnits())
    const playerUnits = usePlayerUnits()
    const enemyUnits = useEnemyUnits()
    const dispatch = useReduxDispatch()

    const { phase, counter } = useReduxSelector(selectBattleState)
    const activeUnit = useReduxSelector(selectActiveUnit)

    useEffect(() => {
        if (phase === 'inactive') {
            dispatch(initialiseBattle())
        }
    }, [dispatch, units, phase])

    return (
        <div>
            <h2>Units</h2>
            <p>Turn: {counter} | Phase: {phase}</p>
            <hr />
            <br />
            <br />
            <br />
            <div>
                {enemyUnits.map((unit) => (
                    renderUnit(
                        unit,
                        unit.id === selectedUnit,
                        unit.id === activeUnit,
                        clickHandler
                    )
                ))}
            </div>
            <br />
            <br />
            <hr />
            <br />
            <br />
            <div>
                {playerUnits.map((unit) => (
                    renderUnit(
                        unit,
                        unit.id === selectedUnit,
                        unit.id === activeUnit,
                        clickHandler
                    )
                ))}
            </div>
            <br />
            <br />
            <br />
            <hr />
            { selectedUnit && units[selectedUnit] && (<p>Selected Unit: {units[selectedUnit].name}</p>) }
        </div>
    )
}

const StyledButton = styled.button<{ isChecked: boolean, isActive: boolean }>`
    border: 2px solid ${props => props.isActive ? 'magenta' : 'black'};
`

export default Arena
