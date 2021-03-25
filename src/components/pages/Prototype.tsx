import React, { useState } from 'react'
import { DefaultPage } from '../UI/templates'
import Arena from '../stuff/Arena'

const Prototype = (): React.ReactElement => {
    const [selectedUnit, setSelectedUnit] = useState<string | null>(null)

    const clickUnitHandler = (id: string) => setSelectedUnit(id !== selectedUnit ? id : null)

    return (
        <DefaultPage>
            <h1>Idle RPG Demo</h1>
            <Arena selectedUnit={selectedUnit} clickHandler={clickUnitHandler} />
        </DefaultPage>
    )
}

export default Prototype
