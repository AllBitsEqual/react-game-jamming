import { CreateUnitProps, Unit } from './units/types'
import { createUnit } from './units'

const testPlayerUnits: CreateUnitProps[] = [
    {
        id: 'test_player_olga',
        side: 'player',
        name: "Olga",
        race: "human",
    },
    {
        id: 'test_player_gus',
        side: 'player',
        name: "Gus",
        race: "human",
    },
    {
        id: 'test_player_bodh',
        side: 'player',
        name: "Bodh",
        race: "elf",
    },
]

const testEnemyUnits: CreateUnitProps[] = [
    {
        id: 'test_enemy_goblin1',
        side: 'enemy',
        name: "Goblin",
        race: "goblin",
    },
    {
        id: 'test_enemy_orc1',
        side: 'enemy',
        name: "Orc",
        race: "orc",
    },
    {
        id: 'test_enemy_goblin2',
        side: 'enemy',
        name: "Goblin",
        race: "goblin",
    },
]

export const createInitialUnits = (): Unit[] => ([
    ...testPlayerUnits.map((entry) => createUnit(entry)),
    ...testEnemyUnits.map((entry) => createUnit(entry)),
])
