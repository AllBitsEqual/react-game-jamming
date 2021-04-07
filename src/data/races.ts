import { Resistance } from './majik'

export const raceNames = ["human", "elf", "orc", "goblin"] as const
export type RaceName = typeof raceNames[number];

export type RaceData = {
    name: RaceName
    hp: number
    mp?: number
    attack: number
    interval: number
    intervalStart: number
    resistance?: Resistance
};

export type RaceConfig = {
    [key in RaceName]: RaceData;
};

const raceData: RaceConfig = {
    human: {
        name: "human",
        hp: 100,
        attack: 40,
        interval: 50,
        intervalStart: 50,
    },
    elf: {
        name: "elf",
        hp: 80,
        attack: 40,
        interval: 40,
        intervalStart: 40,
        resistance: {
            air: 20,
            fire: -20,
        },
    },
    orc: {
        name: "orc",
        hp: 140,
        attack: 30,
        interval: 80,
        intervalStart: 80,
        resistance: {
            earth: 45,
        },
    },
    goblin: {
        name: "goblin",
        hp: 60,
        attack: 20,
        interval: 50,
        intervalStart: 50,
        resistance: {
            fire: -30,
        },
    },
}

export const getRaceData = (race: RaceName): RaceData => raceData[race]
