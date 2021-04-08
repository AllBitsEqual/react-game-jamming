import React from 'react'
import styled from 'styled-components'
import { UnitData } from '../../data/units/types'
import Unit from './Unit'
import { useReduxSelector } from '../../redux'
import { selectBattleState } from '../../redux/ducks/battleLoop'
import { selectActiveUnit } from '../../redux/ducks/animation'

type ArenaProps = {
    playerUnits: UnitData[],
    enemyUnits: UnitData[],
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

const Arena = ({
   playerUnits,
   enemyUnits,
   selectedUnit,
   clickHandler,
}: ArenaProps): React.ReactElement => {


    const { phase, counter } = useReduxSelector(selectBattleState)
    const activeUnit = useReduxSelector(selectActiveUnit)



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
        </div>
    )
}

const StyledButton = styled.button<{ isChecked: boolean, isActive: boolean }>`
    border: 2px solid ${props => props.isActive ? 'magenta' : 'black'};
`

export default Arena
