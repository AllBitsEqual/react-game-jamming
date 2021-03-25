import React from 'react'
import styled from 'styled-components'
import { AttributeValues, UnitData } from '../../data/units/types'

type UnitProps = {
    data: UnitData
    isActive?: boolean
    isTarget?: boolean
    touchHandler?: (id: string) => void
};

const BarValue = (
    label: string,
    color: string,
    values: AttributeValues
) => {
    const { current, base } = values
    const percentage = current / base * 100

    return (
        <>
            <div>{`${label}: ${values.current}/${values.base}`}</div>
            <StyledContainer>
                <StyledBar width={percentage} color={color} />
            </StyledContainer>
        </>
    )
}

const Unit = ({
    data: { name, id, hp, mp },
    isActive = false,
    isTarget = false,
    touchHandler = () => null
}: UnitProps): React.ReactElement => (
    <div
        onClick={() => touchHandler(id)}
        data-active={isActive}
        data-target={isTarget}
    >
        <div>{name}</div>
        {BarValue("HP", 'red', hp)}
        {mp && BarValue("MP", 'blue', mp)}
    </div>
)

const StyledContainer = styled.div`
    display: block;
    border: 1px solid black;
    height: 6px;
    width: 60px;
    background-color: #ccc;
`
const StyledBar = styled.div<{ color: string, width: number }>`
    display: block;
    border: 1px solid black;
    height: 4px;
    width: ${props => (props.width)}%;
    background-color: ${props => (props.color)};
`

export default Unit
