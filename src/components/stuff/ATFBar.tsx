import React from 'react'
import styled from 'styled-components'
import { Sides } from '../../data/units/types'
import { useReduxSelector } from '../../redux'
import { selectActiveFlowMap } from '../../redux/ducks/activeTimeFlow'

type ATFBarProps = {
    selectedUnit: string | null
}

const ATFBar = ({selectedUnit}: ATFBarProps): React.ReactElement => {
    const actorFlowMap = useReduxSelector(selectActiveFlowMap)

    return (
        <div>
            <h2>ATF</h2>
            <hr />
            <StyledATF>
                {actorFlowMap.map((actor, index) => {
                    const { name, id, side, nextInterval } = actor
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <StyledActor key={`${id}_${index}`}
                            side={side}
                            isSelecteed={selectedUnit === id}
                        >
                            {`${name} (${nextInterval})`}
                        </StyledActor>
                    )
                })}
            </StyledATF>
        </div>
    )
}

const StyledATF = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledActor = styled.div<{ side: Sides, isSelecteed: boolean }>`
    border: 1px solid black;
    padding: 3px;
    margin: 0 0 2px;
    font-weight: ${props => props.isSelecteed ? 'bold' : 'normal'};
    background-color: ${props => props.side === 'player' ? 'green' : 'red'};
`

export default ATFBar
