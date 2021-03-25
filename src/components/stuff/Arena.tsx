import React from 'react'
import styled from 'styled-components'
import { UnitData } from '../../data/units/types'
import Unit from './Unit'
import { useCombatUnits, useEnemyUnits, usePlayerUnits } from '../../data/units/hooks'
import { createInitialUnits } from '../../data/testData'

type ArenaProps = {
    selectedUnit: string | null;
    clickHandler: (id: string) => void;
};

const renderUnit = (
    unit: UnitData,
    isChecked: boolean,
    clickHandler: (id: string) => void
) => (
    <StyledButton
        isChecked={isChecked}
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

    return (
        <div>
            <h2>Units</h2>
            <hr />
            <div>
                {playerUnits.map((unit) => (
                    renderUnit(
                        unit,
                        unit.id === selectedUnit,
                        clickHandler
                    )
                ))}
            </div>
            <hr />
            <div>
                {enemyUnits.map((unit) => (
                    renderUnit(
                        unit,
                        unit.id === selectedUnit,
                        clickHandler
                    )
                ))}
            </div>
            <hr />
            { selectedUnit && units[selectedUnit] && (<p>Selected Unit: {units[selectedUnit].name}</p>) }
        </div>
    )
}

const StyledButton = styled.button<{ isChecked: boolean }>`
`

export default Arena
